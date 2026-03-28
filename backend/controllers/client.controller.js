const jwt = require("jsonwebtoken")
const supabase = require("../config/db")

const refresh = async (req, res) => {
    const token = req.cookies.refresh_token;
    if (!token) return res.status(401).json({ error: "Unauthorized" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_REFRESH)

        let userId = decoded.id;
        if (!userId && decoded.email) {
            const { data, error } = await supabase
                .from("users")
                .select("id")
                .eq("email", decoded.email)
                .single();
            if (!error && data) {
                userId = data.id;
            }
        }

        const newAccessToken = jwt.sign({ id: userId, username: decoded.username, email: decoded.email }, process.env.JWT_SECRET, { expiresIn: "15m" })

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
            path: "/"
        });

        return res.status(200).json({ message: "Success Refresh" })

    } catch (err) {
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/"
        });
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/"
        });
        return res.status(401).json({ error: "Refresh token expired or invalid" })
    }
}

module.exports = { refresh }
