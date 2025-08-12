import express from "express";
import { submitFeedback } from "../controllers/feedback.controller.js";

const router = express.Router();

// Submit feedback
router.post("/", submitFeedback);

export default router;