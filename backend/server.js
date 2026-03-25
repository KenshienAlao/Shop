require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();

const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
    /\.vercel\.app$/
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));



app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/client", require("./routes/client.routes"))
app.use("/api/query", require("./routes/query.routes"))
app.use("/api/cart", require("./routes/cart.routes"))

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});