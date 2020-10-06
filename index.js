const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const bc = require("./bc.js");
const db = require("./db.js");
const cryptoRandomString = require("crypto-random-string");
const ses = require("./ses");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const { s3Url } = require("./config");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });

app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: "TOP SECRET LINE",
    maxAge: 1000 * 60 * 60 * 24 * 90,
});
app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/user", async (req, res) => {
    try {
        const user = await db.getUser(req.session.userId);
        res.status(200).json(user.rows[0]);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get("/get-people", async (req, res) => {
    try {
        const { rows } = await db.getRecentUsers();
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get("/search-users", async (req, res) => {
    try {
        const { rows } = await db.searchUsers(req.query.q);
        res.json(rows);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get("/friend-relation/:viewed", async (req, res) => {
    const viewed = req.params.viewed;
    const viewer = req.session.userId;
    const { rows } = await db.getFriendRelation(viewer, viewed);
    if (rows.length < 1) {
        res.status(200).json({ msg: "send friend request" });
    } else {
        const isAccepted = rows[0].accepted;
        const sender = rows[0].sender_id;
        const recipient = rows[0].recipient_id;
        if (isAccepted) {
            res.status(200).json({ msg: "unfriend" });
        } else {
            if (viewer == sender) {
                res.status(200).json({ msg: "cancel friend request" });
            } else if (viewer == recipient) {
                res.status(200).json({ msg: "accept friend request" });
            }
        }
    }
});

app.post("/friend-request", async (req, res) => {
    const sender_id = req.session.userId;
    const recipient_id = req.body.otherID;
    const { rows } = await db.addFriendRequest(sender_id, recipient_id);
    console.log("/friendRequst", rows);
    res.json(rows);
});

app.post("/cancel-request", async (req, res) => {
    const recipient_id = req.body.otherID;
    const sender_id = req.session.userId;
    try {
        await db.cancelFriendRequest(sender_id, recipient_id);
        res.status(200).json({ msg: "send friend request" });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.post("/accept-request", async (req, res) => {
    const sender_id = req.body.otherID;
    const recipient_id = req.session.userId;
    try {
        await db.acceptFriendRequest(sender_id, recipient_id);
        res.status(200).json({ msg: "unfriend" });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.post("/unfriend", async (req, res) => {
    console.error("request");
    const recipient_id = req.body.otherID;
    const sender_id = req.session.userId;
    try {
        await db.cancelFriendRequest(sender_id, recipient_id);
        await db.cancelFriendRequest(recipient_id, sender_id);
        res.status(200).json({ msg: "send friend request" });
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

app.get(`/user/:id.json`, async (req, res) => {
    if (req.session.userId == req.params.id) {
        res.json({ redirect: true });
    } else {
        try {
            const user = await db.getUser(req.params.id);
            if (user.rows.length > 0) {
                res.status(200).json(user.rows[0]);
            } else {
                res.json({ redirect: true });
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
});

app.get("/get-friends", async (req, res) => {
    const userId = req.session.userId;
    console.log(userId);
    try {
        const { rows } = await db.getFriends(userId);
        console.log(rows);

        res.json({
            users: rows,
        });
    } catch (e) {
        res.status(500).json({ e: "something went wrong in getting friends" });
    }
});

app.post("/registration", async (req, res) => {
    try {
        const { first, last, email, password } = req.body;
        const hash = await bc.hash(password);
        const { rows } = await db.addUser(
            first.toLowerCase(),
            last.toLowerCase(),
            email.toLowerCase(),
            hash
        );
        req.session.userId = rows[0].id;
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
        });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let { rows } = await db.getUserEmail(email);
    if (rows.length === 0) {
        res.sendStatus(500);
    } else {
        const result = await bc.compare(password, rows[0].hash);
        if (!result) {
            console.log(`user doesn't exist`);
            res.sendStatus(404);
        } else {
            req.session.userId = rows[0].id;
            res.sendStatus(200);
        }
    }
});

app.post("/reset", async (req, res) => {
    const { email } = req.body;
    let { rows } = await db.getUserEmail(email);
    if (rows.length === 0) {
        res.sendStatus(500);
    } else {
        const secretCode = cryptoRandomString({
            length: 6,
        });
        await db.addCode(email, secretCode);
        ses.sendEmail(email, "Here you Go!", secretCode);
        res.sendStatus(200);
    }
});

app.post("/verify", async (req, res) => {
    const { code, email, password } = req.body;
    const { rows } = await db.getCode(email);
    const { code: dbCode, email: dbEmail } = rows[0];
    if (dbCode === code) {
        try {
            const hash = await bc.hash(password);
            await db.updateUserPwd(dbEmail, hash);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(500);
    }
});

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    if (req.file) {
        const filename = req.file.filename;
        const url = `${s3Url}${filename}`;
        try {
            const result = await db.updateImg(req.session.userId, url);

            res.json({
                image: result.rows[0].img_url,
                success: true,
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                erro: "The file size is too large",
            });
        }
    } else {
        res.sendStatus(500);
    }
});

app.post("/bio", async (req, res) => {
    try {
        const result = await db.updateBio(req.session.userId, req.body.newBio);
        res.status(200).json(result.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e });
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function () {
    console.log("I'm listening.");
});

io.on("connection", async (socket) => {
    console.log(`Socket with id ${socket.id} has connected`);

    const userId = socket.request.session.userId;
    if (!userId) return socket.disconnect(true);

    // db.getLastMsgs().then(({ rows }) => {
    //     console.log("messages", rows);

    // });
    const { rows } = await db.getLastMsgs();
    io.sockets.emit("chatMessages", rows.reverse());

    socket.on("new msg", async (newMsg) => {
        console.log("this message is coming from chat.js component:", newMsg);
        const { rows } = await db.addMessage(userId, newMsg);
        console.log(rows);
        io.sockets.emit("addChatMsg", rows[0]);
    });

    socket.on("disconnect", () => {
        console.log(`Socket with id ${socket.id} has disconnected`);
    });
});
