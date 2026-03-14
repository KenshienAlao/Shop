const express = require("express")
const router = express.Router()

router.get("/profile", require("../middleware/auth.middleware"), (req, res) => {
    res.json({ email: req.client.email, username: req.client.username })
})

module.exports = router