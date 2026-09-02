import express from "express";

import {
    getBusinessAnalytics
} from "../controllers/analyticsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
    "/:businessId",
    authMiddleware,
    getBusinessAnalytics
);

export default router;