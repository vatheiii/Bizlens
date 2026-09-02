import express from "express";

import {
    createAssessment,
    getAssessments
} from "../controllers/digitalController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createAssessment
);

router.get(
    "/:businessId",
    authMiddleware,
    getAssessments
);

export default router;