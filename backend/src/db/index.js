import mongoose from 'mongoose'
import { DB_Name } from '../constaint.js'

const contactDB = async ()=>{
    try {
       const contectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
       console.log(`MongoDB is connected !! host ${contectionInstance.connection.host}`);
    } catch (error) {
        console.log("failed in MongoDB connection",error);
        process.exit(1);
    }
}

export default contactDB;