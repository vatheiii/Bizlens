export const createRecommendationFromInsight = (
    insight
) => {

    switch (insight.insight_type) {

        case "Profit":

            return {

                title:
                    "Improve Profit Margin",

                description:
                    "Review product pricing, supplier costs, and operating expenses.",

                priority:
                    insight.priority,

                impact:
                    "High"
            };


        case "Cost":

            return {

                title:
                    "Reduce Operating Costs",

                description:
                    "Review your major expenses and identify unnecessary costs.",

                priority:
                    insight.priority,

                impact:
                    "Medium"
            };


        case "Sales":

            return {

                title:
                    "Improve Sales Performance",

                description:
                    "Consider improving marketing, promotions, and customer engagement.",

                priority:
                    insight.priority,

                impact:
                    "High"
            };


        default:

            return {

                title:
                    "Monitor Business",

                description:
                    "Continue monitoring your business performance.",

                priority:
                    "Low",

                impact:
                    "Medium"
            };
    }
};