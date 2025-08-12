import app from './app.js'
import dotenv from "dotenv"
import contactDB from './db/index.js'
dotenv.config()

contactDB()
.then(()=>{

    app.listen(process.env.PORT || 5000,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    })

})
.catch((err)=>{
console.log(`connection is failed`)
})

