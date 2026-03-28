const express = require("express")
const router = express.Router()

const cartController = require("../controllers/cart.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/add-to-cart/:product_id", authMiddleware, cartController.addToCart)
router.get("/fetch-to-cart", authMiddleware, cartController.fetchCart)
router.delete("/delete-cart/:product_id", authMiddleware, cartController.deleteCart)
router.put("/update-cart/:product_id", authMiddleware, cartController.updateCart)



module.exports = router