import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import "./auth.js";
import passport from "passport";
import session from "express-session";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(session({
    secret: process.env.SESSION_SECRET || "abcd",
    resave: false,       
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

function loggedIn(req, res, next) {
    if (req.user) {
        next(); 
    } else {
        res.sendStatus(401); 
    }
}

app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Sign in with Google</a>');
});

app.get("/protected", loggedIn, (req, res) => {
    res.send(`Hello, ${req.user.displayName || "User"}!`);
});

app.get("/auth/google", 
    passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/google/callback", 
    passport.authenticate("google", {
        successRedirect: "/protected",
        failureRedirect: "/auth/failure"
    })
);

app.get("/auth/failure", (req, res) => {
    res.send("Authentication failed. Please try again.");
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
