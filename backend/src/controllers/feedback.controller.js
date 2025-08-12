import { Feedback } from "../models/feedback.model.js";
import { Question } from "../models/questions.model.js";
import ApiError from "../utils/apiError.js";
import asynHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
// ✅ Submit feedback
export const submitFeedback = asynHandler(async (req, res) => {

    //taking the enitis from the req.body
    const { studentId, questionId, rating } = req.body

    //checking is it empty
    if (!studentId || !questionId || !rating) {
        throw new ApiError(400, "missing required fields")
    }

    //create a new feedback variable to save in DB
    const feedback = new Feedback({
        studentId,
        rating,
        questionId
    });

    await feedback.save();

    //finding the average
    const stats = await Feedback.aggregate([
        { $match: { questionId: feedback.questionId } },
        { $group: { _id: "$questionId", avgRating: { $avg: "$rating" } } }
    ]);

    //updating the averageRating 
    if (stats.length > 0) {
        await Question.findByIdAndUpdate(questionId, {
            averageRating: stats[0].avgRating
        });
    }

   return res.status(201).json(
         new apiResponse(200,feedback,"feedback submitted successfully.")
    )


})