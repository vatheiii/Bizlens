import express from "express";

import {
    createSale,
    getSales,
    getSaleById,
    deleteSale
} from "../controllers/salesController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createSale);

router.get("/", authMiddleware, getSales);

router.get("/:id", authMiddleware, getSaleById);

router.delete("/:id", authMiddleware, deleteSale);

export default router;