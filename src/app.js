import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import businessRoutes from "./routes/businessRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";
import costRoutes from "./routes/costRoutes.js";
import digitalRoutes from "./routes/digitalRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({
        message: "Bizlens API is running"
    });
});
// ============================================================
// API ROUTES
// ============================================================

app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);

app.use("/api/products", productRoutes);

app.use("/api/sales", salesRoutes);

app.use("/api/costs", costRoutes);

app.use("/api/digital-assessments", digitalRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/recommendations", recommendationRoutes);

app.use("/api/reports", reportRoutes);
// General errors
app.use(errorMiddleware);

app.use((req, res) => {
    res.status(404).json({
        message: "API route not found."
    });
});
export default app;