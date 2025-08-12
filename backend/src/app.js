import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv"

dotenv.config()
const app =express();

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        credentials:true
    })
)

app.use(express.json({limit:"16kb"}))
app.use (express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//importing routes
import router from "./routes/user.route.js";

import Questionrouter from "./routes/question.route.js";
import feedbackRoute from "./routes/feedback.route.js"

app.use("/api/v1/users",router)
app.use("/api/v1/questions",Questionrouter)
app.use("/api/v1/feedback",feedbackRoute)


app.get("/",(req,res)=>{
    res.send("hello world from paramjit saikia")
})


export default app;