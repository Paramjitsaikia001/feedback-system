import { Question } from "../models/questions.model.js"
import asynHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
export const addQuestion = asynHandler(async (req, res) => {

    // export the tittle from the question model
    //add questions
    //save in database
    //get all questions

    const { tittle } = req.body;

    if (!tittle) {
        throw new ApiError(400, "Question tittle is required .");
    }


    const question = new Question({ tittle });
    await question.save();

    return res.status(201).json(
        new apiResponse(200, question, "Question added successfully"),
    )

})

export const getQuestions = asynHandler(async (req, res) => {
    const questions = await Question.find().sort({ createAT: -1 });
    res.json(questions);
})