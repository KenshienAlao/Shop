const supabase = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {

        const { username, email, password, confirmpassword } = req.body

        if (!username || !email || !password || !confirmpassword) return res.status(400).json({ error: "All fields are required" })

        if (password !== confirmpassword) return res.status(400).json({ error: "Passwords do not match" })

        const { data: existClient, error } = await supabase
            .from("users")
            .select("username, email")
            .or(`username.eq.${username}, email.eq.${email}`)
            .single();

        if (existClient) return res.status(400).json({ error: existClient.username === username ? "Username already exists" : "Email already exists" })

        const hashpass = await bcrypt.hash(password, 10);

        const { data, error: insertError } = await supabase
            .from("users")
            .insert([{ username, email, password: hashpass }]);

        insertError ? res.status(400).json({ error: insertError.message }) : res.status(201).json({ data })

    } catch (err) {

        return res.status(500).json({ error: err.message })

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json({ error: "All fields are required" })

        const { data, error } = await supabase
            .from("users")
            .select("username, email, password")
            .eq("email", email)
            .single()

        console.log("test")
        if (error) return res.status(400).json({ error: error.message })

        const isMatch = await bcrypt.compare(password, data.password)


        if (!isMatch) return res.status(400).json({ error: "Password do not match" })

        const token = jwt.sign({ username: data.username, email: data.email }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: "strict",
            maxAge: 3600000
        })
        console.log(token);
        return res.status(200).json({
            message: "Success Login",
            user: { username: data.username, email: data.email }
        })


    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        })
        return res.status(200).json({ message: "Success Logout" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = { register, login, logout }
