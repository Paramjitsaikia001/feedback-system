import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asynHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const verifyJWT = asynHandler(async (req, res, next) => {

    //steps i follow
    //1.getting the token from cookie or req.header
    //2.token validation
    //3.decoded the token
    //4.get the user from decodedtoken 
    //validate the user
    //give the user info to req.user
    //then next()
    try {
        const token = req.cookies?.accessToken 
        // const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
        

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "invalid acces token")
        }

        req.user = user
        req.token = token
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }



})