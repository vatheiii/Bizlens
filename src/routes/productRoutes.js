import express from "express";

import {
    createProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);

router.get("/", authMiddleware, getProduct);

router.get("/:id", authMiddleware, getProductById);

router.put("/:id", authMiddleware, updateProduct);

router.delete("/:id", authMiddleware, deleteProduct);

export default router;