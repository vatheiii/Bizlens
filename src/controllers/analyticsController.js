/*Revenue = Quantity × Selling Price

Product Cost = Quantity × Cost Price

Gross Profit = Revenue - Product Cost

Profit Margin = Gross Profit / Revenue × 100*/

import { Business } from "../models/index.js";

import {
    getCompleteAnalytics
} from "../services/analytics/analyticsService.js";


// ============================================================
// GET COMPLETE BUSINESS ANALYTICS
// GET /api/analytics/:businessId
// ============================================================

export const getBusinessAnalytics = async (req, res) => {

    try {

        const businessId = req.params.businessId;

        // ----------------------------------------------------
        // Check whether the business belongs to the user
        // ----------------------------------------------------

        const business = await Business.findOne({
            where: {
                business_id: businessId,
                user_id: req.user.user_id
            }
        });

        if (!business) {
            return res.status(404).json({
                success: false,
                message: "Business not found."
            });
        }


        // ----------------------------------------------------
        // Get complete analytics
        // ----------------------------------------------------

        const analytics =
            await getCompleteAnalytics(
                businessId
            );


        // ----------------------------------------------------
        // Return response
        // ----------------------------------------------------

        return res.status(200).json({
            success: true,
            business_id: businessId,
            analytics
        });


    } catch (error) {

        console.error(
            "Analytics Controller Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get business analytics.",
            error: error.message
        });
    }
};