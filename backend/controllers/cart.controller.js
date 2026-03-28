const { AuthRetryableFetchError } = require("@supabase/supabase-js/dist/index.cjs")
const supabase = require("../config/db")
const addToCart = async (req, res) => {
    try {
        const userID = req.client.id
        const productID = req.params.product_id
        const { Productqty } = req.body
        if (!userID || !productID || !Productqty) return res.status(400).json({ error: "All fields are required" })
        let { data: user } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", userID)
            .maybeSingle()

        if (!user) {
            const { data: newUser } = await supabase
                .from("cart")
                .insert({ user_id: userID })
                .select()
                .single()
            user = newUser;
        }
        const { data: productExist } = await supabase
            .from("cart_item")
            .select("*")
            .eq("cart_id", user.id)
            .eq("product_id", productID)
            .maybeSingle()

        if (productExist) return res.status(400).json({ error: "Product already exists in cart" })
        const { data: newProduct } = await supabase
            .from("cart_item")
            .insert({ cart_id: user.id, product_id: productID, qty: Productqty })
            .select()
            .single()
        return res.status(200).json({ message: "Successfully Added to Cart", data: newProduct })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}
const fetchCart = async (req, res) => {
    try {
        const userID = req.client.id
        if (!userID) return res.status(400).json({ error: "User not found" })
        let { data: user } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", userID)
            .maybeSingle()

        if (!user) {
            const { data: newUser } = await supabase
                .from("cart")
                .insert({ user_id: userID })
                .select()
                .single()
            user = newUser;
        }

        const { data: exist, error: existError } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", userID)
            .maybeSingle()
        if (existError) return res.status(500).json({ error: existError.message })
        if (exist) {
            const { data: cartItems, error: cartItemsError } = await supabase
                .from("cart_item")
                .select("*")
                .eq("cart_id", exist.id)
            if (cartItemsError) return res.status(401).json({ error: cartItemsError.message })
            return res.status(200).json({ cartItems })
        }
        return res.status(404).json({ error: "Cart not found" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


const deleteCart = async (req, res) => {
    try {
        const userID = req.client.id
        const rawProductID = req.params.product_id
        const productID = rawProductID.split(",").map(Number)
        const { data: userCart, error: userCartError } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", userID)
            .maybeSingle()

        if (userCartError) return res.status(500).json({ error: userCartError.message })
        if (!userCart) return res.status(404).json({ error: "Cart not found" })

        const { data: cartItems, error: cartItemsError } = await supabase
            .from("cart_item")
            .delete()
            .eq("cart_id", userCart.id)
            .in("product_id", productID)
        if (cartItemsError) return res.status(401).json({ error: cartItemsError.message })
        return res.status(200).json({ message: "Successfully Deleted from Cart", data: cartItems })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const updateCart = async (req, res) => {
    try {
        const userID = req.client.id
        const rawProductID = req.params.product_id
        const productID = rawProductID.split(",").map(Number)
        const { data: userCart, error: userCartError } = await supabase
            .from("cart")
            .select("*")
            .eq("user_id", userID)
            .maybeSingle()

        if (userCartError) return res.status(500).json({ error: userCartError.message })
        if (!userCart) return res.status(404).json({ error: "Cart not found" })

        const { data: cartItems, error: cartItemsError } = await supabase
            .from("cart_item")
            .update({ qty: req.body.qty })
            .eq("cart_id", userCart.id)
            .in("product_id", productID)
        if (cartItemsError) return res.status(401).json({ error: cartItemsError.message })
        return res.status(200).json({ message: "Successfully Updated Cart", data: cartItems })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


module.exports = { addToCart, fetchCart, deleteCart, updateCart }