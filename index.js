import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
// import { signIn, signUp } from "./auth/auth1.js";
import dotenv from "dotenv";
// import authRoutes from "./auth/auth2.js";
import "./auth.js";
import passport from "passport";
import session from "express-session";

function logedIn(req, res, next) {
    if (req.user) {
        next(); 
    } else {
        res.sendStatus(404);
    }
}

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(session({
    secret: "abcd",
    resave: false,       
    saveUninitialized: false 
}));
  
app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "frontend")));

// app.use("/auth", authRoutes);
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "frontend", "login.html"));
    res.send('<a href="/auth/google">SignIn with Google</a>');
});

app.get("/protected", logedIn, (req, res) => {
    res.send("Hello!")
});

app.get("/auth/google", 
    passport.authenticate('google', { scope: ['email', 'profile']})
)

app.get("/google/callback", 
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

app.get('/auth/failure', (req, res) => {
    res.send("Something went wrong");
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});