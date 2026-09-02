import express from "express";

import {
    generateInsights
} from "../controllers/aiController.js";

import authMiddleware
    from "../middleware/authMiddleware.js";


const router = express.Router();


router.post(
    "/:businessId/generate",
    authMiddleware,
    generateInsights
);


export default router;