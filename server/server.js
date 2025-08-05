const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const feedbackRoutes = require("./routes/feedback")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/feedback-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/feedback", feedbackRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
