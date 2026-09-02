import {
    DigitalAssessment,
    Business
} from "../models/index.js";


// ============================================================
// CREATE ASSESSMENT
// POST /api/digital-assessments
// ============================================================

export const createAssessment = async (req, res) => {
    try {
        const {
            business_id,
            digital_sales,
            data_management,
            marketing,
            cybersecurity,
            operations
        } = req.body;

        const business = await Business.findOne({
            where: {
                business_id,
                user_id: req.user.user_id
            }
        });

        if (!business) {
            return res.status(404).json({
                message: "Business not found."
            });
        }

        const total_score =
            Number(digital_sales || 0) +
            Number(data_management || 0) +
            Number(marketing || 0) +
            Number(cybersecurity || 0) +
            Number(operations || 0);

        const assessment = await DigitalAssessment.create({
            business_id,
            digital_sales,
            data_management,
            marketing,
            cybersecurity,
            operations,
            total_score
        });

        res.status(201).json({
            message: "Digital assessment created successfully.",
            assessment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create assessment.",
            error: error.message
        });
    }
};


// ============================================================
// GET ASSESSMENTS
// GET /api/digital-assessments/:businessId
// ============================================================

export const getAssessments = async (req, res) => {
    try {
        const business = await Business.findOne({
            where: {
                business_id: req.params.businessId,
                user_id: req.user.user_id
            }
        });

        if (!business) {
            return res.status(404).json({
                message: "Business not found."
            });
        }

        const assessments =
            await DigitalAssessment.findAll({
                where: {
                    business_id: req.params.businessId
                },
                order: [
                    ["created_at", "DESC"]
                ]
            });

        res.json({
            assessments
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get assessments.",
            error: error.message
        });
    }
};