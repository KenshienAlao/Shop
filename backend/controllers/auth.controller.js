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

        if (error) return res.status(400).json({ error: "Email don't exist" })

        const isMatch = await bcrypt.compare(password, data.password)


        if (!isMatch) return res.status(400).json({ error: "Password do not match" })

        const accessToken = jwt.sign({ username: data.username, email: data.email }, process.env.JWT_SECRET, { expiresIn: "15m" })
        const refreshToken = jwt.sign({ username: data.username, email: data.email }, process.env.JWT_SECRET_REFRESH, { expiresIn: "30d" })

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000
        })


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
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        })
        return res.status(200).json({ message: "Success Logout" })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}



module.exports = { register, login, logout }
