import { Feedback } from "../models/feedback.model.js";
import { Question } from "../models/questions.model.js";
import ApiError from "../utils/apiError.js";
import asynHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
// ✅ Submit feedback
export const submitFeedback = asynHandler(async (req, res) => {

    //taking the enitis from the req.body
    const { questionId, rating } = req.body
    const studentId = req.user._id;

    //checking is it empty
    if (!questionId || !rating) {
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


export const getFeedbackStats = asynHandler(async (req, res) => {
  const perQuestion = await Question.aggregate([
    {
      $lookup: {
        from: "feedbacks", // collection name in MongoDB
        localField: "_id",
        foreignField: "questionId",
        as: "feedbacks"
      }
    },
    {
      $project: {
        _id: 1,
        questionText: "$tittle",
        totalResponses: { $size: "$feedbacks" },
        avgRating: {
          $cond: [
            { $gt: [{ $size: "$feedbacks" }, 0] },
            { $avg: "$feedbacks.rating" },
            0
          ]
        }
      }
    }
  ]);

  const ratingDistribution = await Feedback.aggregate([
    {
      $group: {
        _id: "$rating",
        count: { $sum: 1 }
      }
    }
  ]);

  res.json({
    perQuestion,
    ratingDistribution
  });
});