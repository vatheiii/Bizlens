import express from "express";

import {
    getBusinessReport
} from "../controllers/reportController.js";

import authMiddleware
    from "../middleware/authMiddleware.js";


const router = express.Router();


router.get(
    "/:businessId",
    authMiddleware,
    getBusinessReport
);


export default router;