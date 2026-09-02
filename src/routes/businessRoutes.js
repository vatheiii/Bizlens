import express from "express";

import {
    createBusiness,
    getBusinesses,
    getBusinessById,
    updateBusiness,
    deleteBusiness
} from "../controllers/businessController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBusiness);

router.get("/", authMiddleware, getBusinesses);

router.get("/:id", authMiddleware, getBusinessById);

router.put("/:id", authMiddleware, updateBusiness);

router.delete("/:id", authMiddleware, deleteBusiness);

export default router;