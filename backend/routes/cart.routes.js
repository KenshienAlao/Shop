const express = require("express")
const router = express.Router()

const cartController = require("../controllers/cart.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/add-to-cart/:product_id", authMiddleware, cartController.addToCart)
router.get("/fetch-to-cart", authMiddleware, cartController.fetchCart)


module.exports = router