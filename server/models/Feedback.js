const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    behavior: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    delivery: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    engagement: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Feedback", feedbackSchema)
