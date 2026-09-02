export const analyzeCosts = (profitData) => {

    const insights = [];

    const revenue =
        Number(profitData.revenue);

    const operatingCost =
        Number(profitData.operating_cost);


    if (
        revenue > 0 &&
        operatingCost > revenue * 0.3
    ) {

        insights.push({

            type: "Cost",

            priority: "High",

            title: "High Operating Costs",

            description:
                "Operating costs are more than 30% of your revenue. Review your major expenses."
        });
    }


    return insights;
};