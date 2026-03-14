require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000", /\.vercel\.app$/],
    credentials: true
}));
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/client", require("./routes/client.routes"))

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});