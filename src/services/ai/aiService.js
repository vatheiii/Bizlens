import {
    getCompleteAnalytics
} from "../analytics/analyticsService.js";

import {
    analyzeProfit
} from "./rule/profitRules.js";

import {
    analyzeCosts
} from "./rule/costRules.js";

import {
    analyzeSales
} from "./rule/salesRules.js";


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