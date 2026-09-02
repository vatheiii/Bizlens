import express from "express";

import {
    getRecommendations,
    generateRecommendations
} from "../controllers/recommendationController.js";

import authMiddleware
    from "../middleware/authMiddleware.js";


const router = express.Router();


// Get existing recommendations
router.get(
    "/:businessId",
    authMiddleware,
    getRecommendations
);


// Generate new recommendations
router.post(
    "/:businessId/generate",
    authMiddleware,
    generateRecommendations
);


export default router;