import express, { Router } from "express";

import { addQuestion,getQuestions } from "../controllers/question.controller.js";

const router =express.Router();

router.post("/",addQuestion);
router.get("/",getQuestions);

export default router;