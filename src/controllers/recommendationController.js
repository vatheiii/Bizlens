import {
    Business,
    AIInsight,
    Recommendation
} from "../models/index.js";

import {
    createRecommendationFromInsight
} from "../services/ai/recommendationService.js";


// ============================================================
// GET RECOMMENDATIONS
// GET /api/recommendations/:businessId
// ============================================================

export const getRecommendations = async (req, res) => {

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
        // Get recommendations
        // ----------------------------------------------------

        const recommendations =
            await Recommendation.findAll({
                where: {
                    business_id: businessId
                },
                order: [
                    ["created_at", "DESC"]
                ]
            });


        // ----------------------------------------------------
        // Return response
        // ----------------------------------------------------

        return res.status(200).json({

            success: true,

            business_id:
                businessId,

            count:
                recommendations.length,

            recommendations
        });


    } catch (error) {

        console.error(
            "Get Recommendations Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get recommendations.",
            error: error.message
        });
    }
};



// ============================================================
// GENERATE RECOMMENDATIONS
// POST /api/recommendations/:businessId/generate
// ============================================================

export const generateRecommendations = async (
    req,
    res
) => {

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
        // Get AI insights
        // ----------------------------------------------------

        const insights =
            await AIInsight.findAll({
                where: {
                    business_id: businessId
                },
                order: [
                    ["created_at", "DESC"]
                ]
            });


        if (insights.length === 0) {

            return res.status(400).json({
                success: false,
                message:
                    "No AI insights found. Generate AI insights first."
            });
        }


        // ----------------------------------------------------
        // Generate recommendations
        // ----------------------------------------------------

        const recommendations = [];


        for (const insight of insights) {

            const recommendation =
                createRecommendationFromInsight(
                    insight
                );


            if (!recommendation) {
                continue;
            }


            const savedRecommendation =
                await Recommendation.create({

                    business_id:
                        businessId,

                    title:
                        recommendation.title,

                    description:
                        recommendation.description,

                    priority:
                        recommendation.priority,

                    impact:
                        recommendation.impact
                });


            recommendations.push(
                savedRecommendation
            );
        }


        // ----------------------------------------------------
        // Return response
        // ----------------------------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Recommendations generated successfully.",

            count:
                recommendations.length,

            recommendations
        });


    } catch (error) {

        console.error(
            "Generate Recommendations Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to generate recommendations.",
            error: error.message
        });
    }
};