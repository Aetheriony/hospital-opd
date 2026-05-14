import { serialize } from "cookie";

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    // Must match cookie name and options from pages/api/auth/signin.js
    res.setHeader(
        "Set-Cookie",
        serialize("_vercel_jwt", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            expires: new Date(0),
            sameSite: "strict",
            path: "/",
        })
    );

    res.status(200).json({ message: "Logout successful" });
}
