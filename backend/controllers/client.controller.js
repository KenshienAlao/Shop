const jwt = require("jsonwebtoken")

const refresh = async (req, res) => {
    const token = req.cookies.refresh_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH)
        const newAccessToken = jwt.sign({ username: decoded.username, email: decoded.email }, process.env.JWT_SECRET, { expiresIn: "15m" })

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 15 * 60 * 1000
        });

        return res.status(200).json({ message: "Success Refresh" })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = { refresh }
