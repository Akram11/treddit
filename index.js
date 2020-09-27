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

app.use(express.json());
app.use(
    cookieSession({
        secret: "TOP SECRET LINE",
        maxAge: 24 * 60 * 60 * 1000,
    })
);

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
    const user = await db.getUser(req.session.userId);
    res.status(200).json(user.rows[0]);
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
    console.log(email);
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

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
