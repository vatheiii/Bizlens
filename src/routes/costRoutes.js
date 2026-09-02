import express from "express";

import {
    createCost,
    getCosts,
    deleteCost
} from "../controllers/costController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCost);

router.get("/", authMiddleware, getCosts);

router.delete("/:id", authMiddleware, deleteCost);

export default router;