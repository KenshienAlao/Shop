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


        if (!user) return res.status(404).json({ error: "User not found" })

        const { data: productExist } = await supabase
            .from("cart_item")
            .select("*")
            .eq("cart_id", user.id)
            .eq("product_id", productID)
            .maybeSingle()

        if (productExist) return res.status(400).json({ error: "Product already exists in cart" })
        const { data: newProduct, error } = await supabase
            .from("cart_item")
            .insert({ cart_id: user.id, product_id: productID, qty: Productqty })
            .select()
            .single()

        if (error) console.log(error)

        console.log("Added to cart:", newProduct)
        return res.status(200).json({ message: "Successfully Added to Cart" })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


module.exports = { addToCart }