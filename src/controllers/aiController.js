import { Business } from "../models/index.js";

import {
    generateBusinessInsights
} from "../services/ai/aiService.js";

import {
    saveInsights
} from "../services/ai/insightSrvice.js";


// ============================================================
// GENERATE BUSINESS AI INSIGHTS
// POST /api/ai/:businessId/generate
// ============================================================

export const generateInsights = async (req, res) => {

    try {

        const businessId = req.params.businessId;


        // ----------------------------------------------------
        // Check business ownership
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
        // Generate AI insights
        // ----------------------------------------------------

        const result =
            await generateBusinessInsights(
                businessId
            );


        // ----------------------------------------------------
        // Check whether insights were generated
        // ----------------------------------------------------

        if (
            !result.insights ||
            result.insights.length === 0
        ) {

            return res.status(200).json({
                success: true,
                message: "No new insights were generated.",
                analytics: result.analytics,
                insights: []
            });
        }


        // ----------------------------------------------------
        // Save insights into database
        // ----------------------------------------------------

        const savedInsights =
            await saveInsights(
                businessId,
                result.insights
            );


        // ----------------------------------------------------
        // Return response
        // ----------------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "AI insights generated successfully.",

            analytics:
                result.analytics,

            insights:
                savedInsights
        });


    } catch (error) {

        console.error(
            "AI Controller Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to generate AI insights.",
            error: error.message
        });
    }
};