import mongoose, { Schema } from "mongoose";
import JWT from "jsonwebtoken";
import bycrpt from "bcryptjs";


const userSchema = new Schema({

    username: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: [true, "password is required "]
    },
    universityName :{
        type:String,
required:true,
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student'
    },
    refreshToken: {
        type: String
    }

},
    {
        timestamps: true
    }


)

userSchema.pre("save", async function (next) {
    if (this.isModified("fullname") && !this.username) {
        this.username = this.fullname.toLowerCase().trim().replace(/\s+/g, "_");
    }
     if (!this.isModified("password")) return next();

    this.password = await bycrpt.hash(this.password, 10);
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bycrpt.compare(password, this.password)
}

userSchema.methods.generateACCESS_TOKEN = function () {
    return JWT.sign({
        _id: this._id,
        username: this.username,
        fullname: this.fullname,
        email: this.email

    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }

    )
}

userSchema.methods.generateREFRESH_TOKEN = function () {
    return JWT.sign({
        _id: this._id,
        username: this.username,
        fullname: this.fullname,
        email: this.email

    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
        }

    )
}

export const User = mongoose.model("User", userSchema)