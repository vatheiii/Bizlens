import { Business } from "../models/index.js";

import {
    generateBusinessReport
} from "../services/report/reportService.js";


// ============================================================
// GET BUSINESS REPORT
// GET /api/reports/:businessId
// ============================================================

export const getBusinessReport = async (req, res) => {

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
        // Generate report
        // ----------------------------------------------------

        const report =
            await generateBusinessReport(
                businessId
            );


        // ----------------------------------------------------
        // Return report
        // ----------------------------------------------------

        return res.status(200).json({

            success: true,

            business_id:
                businessId,

            report
        });


    } catch (error) {

        console.error(
            "Report Controller Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Failed to generate business report.",
            error: error.message
        });
    }
};