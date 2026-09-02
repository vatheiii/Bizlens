import {
    Sale,
    Product,
    Business
} from "../models/index.js";
import { Op } from "sequelize";


// ============================================================
// CREATE SALE
// POST /api/sales
// ============================================================

export const createSale = async (req, res) => {
    try {
        const {
            business_id,
            product_id,
            sale_date,
            quantity
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

        const product = await Product.findOne({
            where: {
                product_id,
                business_id
            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        if (!sale_date || !quantity) {
            return res.status(400).json({
                message: "Sale date and quantity are required."
            });
        }

        const sale = await Sale.create({
            business_id,
            product_id,
            sale_date,
            quantity,
            selling_price: product.selling_price,
            cost_price: product.cost_price
        });

        res.status(201).json({
            message: "Sale created successfully.",
            sale
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create sale.",
            error: error.message
        });
    }
};


// ============================================================
// GET SALES
// GET /api/sales?business_id=1
// ============================================================

export const getSales = async (req, res) => {
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
            where.sale_date = {
                [Op.between]: [start_date, end_date]
            };
        }

        const sales = await Sale.findAll({
            where,
            include: {
                model: Product,
                as: "product",
                attributes: [
                    "product_id",
                    "name",
                    "category"
                ]
            },
            order: [
                ["sale_date", "DESC"]
            ]
        });

        res.json({
            sales
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get sales.",
            error: error.message
        });
    }
};


// ============================================================
// GET SALE BY ID
// GET /api/sales/:id
// ============================================================

export const getSaleById = async (req, res) => {
    try {
        const sale = await Sale.findOne({
            where: {
                sale_id: req.params.id
            },
            include: [
                {
                    model: Product,
                    as: "product"
                },
                {
                    model: Business,
                    as: "business",
                    where: {
                        user_id: req.user.user_id
                    }
                }
            ]
        });

        if (!sale) {
            return res.status(404).json({
                message: "Sale not found."
            });
        }

        res.json({
            sale
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get sale.",
            error: error.message
        });
    }
};


// ============================================================
// DELETE SALE
// DELETE /api/sales/:id
// ============================================================

export const deleteSale = async (req, res) => {
    try {
        const sale = await Sale.findOne({
            where: {
                sale_id: req.params.id
            },
            include: {
                model: Business,
                as: "business",
                where: {
                    user_id: req.user.user_id
                }
            }
        });

        if (!sale) {
            return res.status(404).json({
                message: "Sale not found."
            });
        }

        await sale.destroy();

        res.json({
            message: "Sale deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete sale.",
            error: error.message
        });
    }
};