const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json({ error: "Unauthorized" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded.id) {
            return res.status(401).json({ error: "Unauthorized: Access token is missing identity" });
        }

        req.client = decoded
        next()
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" })
    }
}

module.exports = authMiddleware