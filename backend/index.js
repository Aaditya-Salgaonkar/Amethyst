import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import "./auth.js";
import passport from "passport";
import session from "express-session";
import cors from "cors";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ 
    origin: "http://localhost:3000",
    credentials: true
}));

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

// app.get("/", (req, res) => {
//     res.send('<a href="/auth/google">Sign in with Google</a>');
// });

// app.get("/home", loggedIn, (req, res) => {
//     res.send(`Hello, ${req.user.displayName || "User"}!`);
// });

app.get("/auth/google", 
    passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get("/google/callback", 
    passport.authenticate("google", {
        failureRedirect: "/auth/failure"
    }), (req, res) => {
        res.redirect("http://localhost:3000/");
    }
);

// successredirect and failureredirect is used for internal routes
app.get("/auth/failure", (req, res) => {
    res.send("Authentication failed. Please try again."); 
});

app.get("/auth/user", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);  // Send user data to frontend
        console.log(req.user);
    } else {
        res.status(401).json({ message: "Not authenticated" });
    }
});

app.get("/auth/logout", (req, res, next) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.session.destroy();
      res.status(200).json({ message: "Logged out successfully" });
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
