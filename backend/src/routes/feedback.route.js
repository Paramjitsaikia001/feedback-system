import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getFeedbackStats } from "../controllers/feedback.controller.js";
const router = express.Router();

// Submit feedback
router.post("/",verifyJWT, submitFeedback);
router.get("/statistics", verifyJWT, getFeedbackStats);

export default router;