const express = require("express")
const router = express.Router();

const queryController = require("../controllers/query.controller")
const authMiddleware = require("../middleware/auth.middleware")



router.post("/input", authMiddleware, queryController.input)
router.get("/get", authMiddleware, queryController.get)


module.exports = router
