import express from "express";
import { signIn, signUp } from "./auth1.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await signUp(email, password);
        res.status(200).json({ message: "User signed up successfully!", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await signIn(email, password);
        res.status(200).json({ message: "Login successful!", data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
