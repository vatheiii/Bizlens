export const analyzeSales = (salesData) => {

    const insights = [];


    if (salesData.total_sales === 0) {

        insights.push({

            type: "Sales",

            priority: "High",

            title: "No Sales Recorded",

            description:
                "No sales have been recorded yet. Start recording sales to receive business insights."
        });

    } else if (
        salesData.total_quantity < 10
    ) {

        insights.push({

            type: "Sales",

            priority: "Medium",

            title: "Low Sales Volume",

            description:
                "Your current sales volume is relatively low. Consider reviewing your marketing and customer acquisition strategies."
        });
    }


    return insights;
};