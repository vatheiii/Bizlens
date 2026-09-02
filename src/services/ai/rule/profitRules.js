export const analyzeProfit = (profitData) => {

    const insights = [];

    const margin =
        Number(profitData.profit_margin);


    if (margin < 10) {

        insights.push({
            type: "Profit",
            priority: "High",

            title: "Low Profit Margin",

            description:
                `Your profit margin is ${margin}%. Consider reviewing your pricing and costs.`
        });

    } else if (margin < 20) {

        insights.push({
            type: "Profit",
            priority: "Medium",

            title: "Moderate Profit Margin",

            description:
                `Your profit margin is ${margin}%. There may be opportunities to improve profitability.`
        });

    } else {

        insights.push({
            type: "Profit",
            priority: "Low",

            title: "Healthy Profit Margin",

            description:
                `Your profit margin is ${margin}%. Your current profitability looks healthy.`
        });
    }


    return insights;
};