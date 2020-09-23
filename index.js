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

app.post("/registration", (req, res) => {
    console.log("post", req.body);
    const { first, last, email, password } = req.body;
    bc.hash(password)
        .then((hash) => {
            db.addUser(first, last, email.toLowerCase(), hash)
                .then(({ rows }) => {
                    req.session.userId = rows[0].id;
                    res.sendStatus(200);
                    console.log(req.session.userId);
                })
                .catch((err) => {
                    console.error("error adding a user", err);
                    res.status(500).send("Something broke!");
                });
        })
        .catch((err) => {
            console.error("error Hashig the password", err);
            res.status(500).send({
                message: "This is an error!",
            });
        });
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
