const express = require("express")
const Feedback = require("../models/Feedback")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Submit feedback (Students only)
router.post("/submit", auth, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can submit feedback" })
    }

    const { teacherId, behavior, delivery, engagement, comment } = req.body

    // Verify teacher exists
    const teacher = await User.findById(teacherId)
    if (!teacher || teacher.role !== "teacher") {
      return res.status(400).json({ message: "Invalid teacher ID" })
    }

    const feedback = new Feedback({
      studentId: req.user._id,
      teacherId,
      behavior,
      delivery,
      engagement,
      comment,
    })

    await feedback.save()

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get feedback for a teacher (Teachers only)
router.get("/teacher/:teacherId", auth, async (req, res) => {
  try {
    const { teacherId } = req.params

    // Check if requesting user is the teacher or has permission
    if (req.user.role !== "teacher" || req.user._id.toString() !== teacherId) {
      return res.status(403).json({ message: "Access denied" })
    }

    const feedbacks = await Feedback.find({ teacherId }).populate("studentId", "username").sort({ createdAt: -1 })

    // Calculate averages
    const totalFeedbacks = feedbacks.length
    if (totalFeedbacks === 0) {
      return res.json({
        feedbacks: [],
        averages: { behavior: 0, delivery: 0, engagement: 0 },
        totalFeedbacks: 0,
      })
    }

    const averages = {
      behavior: feedbacks.reduce((sum, f) => sum + f.behavior, 0) / totalFeedbacks,
      delivery: feedbacks.reduce((sum, f) => sum + f.delivery, 0) / totalFeedbacks,
      engagement: feedbacks.reduce((sum, f) => sum + f.engagement, 0) / totalFeedbacks,
    }

    res.json({
      feedbacks,
      averages,
      totalFeedbacks,
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

// Get all teachers (for student feedback form)
router.get("/teachers", auth, async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("_id username")
    res.json(teachers)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
})

module.exports = router
