const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const bc = require("./bc.js");
const db = require("./db.js");

app.use(express.json());
app.use(
    cookieSession({
        secret: "TOP SECRET LINE",
        maxAge: 24 * 60 * 60,
    })
);

app.use(csurf());
app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

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
