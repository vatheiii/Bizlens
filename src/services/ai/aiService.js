import {
    getCompleteAnalytics
} from "../analytics/analyticsService.js";

import {
    analyzeProfit
} from "./rules/profitRules.js";

import {
    analyzeCosts
} from "./rules/costRules.js";

import {
    analyzeSales
} from "./rules/salesRules.js";


export const generateBusinessInsights = async (
    businessId
) => {

    // Get analytics
    const analytics =
        await getCompleteAnalytics(
            businessId
        );


    // Generate insights
    const profitInsights =
        analyzeProfit(
            analytics.profit
        );

    const costInsights =
        analyzeCosts(
            analytics.profit
        );

    const salesInsights =
        analyzeSales(
            analytics.sales
        );


    const insights = [

        ...profitInsights,

        ...costInsights,

        ...salesInsights
    ];


    return {

        analytics,

        insights
    };
};