const express = require("express")
const router = express.Router()

const clientController = require("../controllers/client.controller")

router.get("/profile", require("../middleware/auth.middleware"), (req, res) => {
    res.json({ email: req.client.email, username: req.client.username })
})

router.post("/refresh", clientController.refresh) // for token

module.exports = router