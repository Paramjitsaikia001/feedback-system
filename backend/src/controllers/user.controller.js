import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";


const generateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID)
        const accessToken = user.generateACCESS_TOKEN()
        const refreshToken = user.generateREFRESH_TOKEN()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Error in Generating access token")
    }
}


const RegisterUser = asyncHandler(async (req, res) => {
    //steps to register a user
    //first get the data from the user 
    // at the first user put the email and can verify 
    //fill the other datas
    //validation - not empty
    //checking is the email is already exist - if not then procees
    // after submiting we check the email is verified for not - if verifed proceed or if not then pleae verify
    //create user object - create entry in db
    //remove password and refreh token from the response
    //check the user creation 
    //return the res

    const { fullname, email, password, universityName, role, username } = req.body
    console.log(email)

    //checking is all field are fiiled 
    if (
        [fullname, email, password, universityName, role].some((field) =>
            field?.trim() == "")) {
        throw new ApiError(400, "All fields are required")
    }

    //email verification using sendmail

    //checking is the email already registered
    const isExit = await User.findOne({ email })

    if (isExit) {
        throw new ApiError(409, " Email is already registered")
    }

    const user = await User.create(
        {
            fullname,
            email,
            universityName,
            password,
            role,
            username
        }
    )

    const createuser = await User.findById(user._id).select(
        "-password -refreshToken"
    )


    if (!createuser) {
        throw new ApiError(500, "somthing wrong on server");
    }

    return res.status(201).json(
        new apiResponse(200, createuser, "user registered successfully")
    )

})

const loginUser = asyncHandler(async (req, res) => {

    //steps
    //get the data from req.body
    //checking the email or username is valid
    //checking the password
    //access token and refresh token
    //send cookies


    const { username, email, password } = req.body

    if (!(username || email)) {
        throw new ApiError(400, "Username or Email is required")
    }

    const user = await User.findOne({
        $or: [{ username}, {email }]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Password");
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedinUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
            200,
            {
                user: loggedinUser, accessToken, refreshToken
            },
            "user logged in successfully"
        )
        )
})

export default {
    RegisterUser,
    loginUser
}
