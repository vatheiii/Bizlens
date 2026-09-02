import { Cost, Business } from "../models/index.js";
import { Op } from "sequelize";


// ============================================================
// CREATE COST
// POST /api/costs
// ============================================================

export const createCost = async (req, res) => {
    try {
        const {
            business_id,
            cost_name,
            category,
            amount,
            cost_date,
            description
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

        if (!cost_name || amount === undefined || !cost_date) {
            return res.status(400).json({
                message: "Cost name, amount and date are required."
            });
        }

        const cost = await Cost.create({
            business_id,
            cost_name,
            category,
            amount,
            cost_date,
            description
        });

        res.status(201).json({
            message: "Cost created successfully.",
            cost
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create cost.",
            error: error.message
        });
    }
};


// ============================================================
// GET COSTS
// GET /api/costs?business_id=1
// ============================================================

export const getCosts = async (req, res) => {
    try {
        const {
            business_id,
            start_date,
            end_date
        } = req.query;

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

        const where = {
            business_id
        };

        if (start_date && end_date) {
            where.cost_date = {
                [Op.between]: [start_date, end_date]
            };
        }

        const costs = await Cost.findAll({
            where,
            order: [
                ["cost_date", "DESC"]
            ]
        });

        res.json({
            costs
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get costs.",
            error: error.message
        });
    }
};


// ============================================================
// DELETE COST
// DELETE /api/costs/:id
// ============================================================

export const deleteCost = async (req, res) => {
    try {
        const cost = await Cost.findOne({
            where: {
                cost_id: req.params.id
            },
            include: {
                model: Business,
                as: "business",
                where: {
                    user_id: req.user.user_id
                }
            }
        });

        if (!cost) {
            return res.status(404).json({
                message: "Cost not found."
            });
        }

        await cost.destroy();

        res.json({
            message: "Cost deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete cost.",
            error: error.message
        });
    }
};