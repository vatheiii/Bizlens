import { AIInsight } from "../../models/index.js";

export const saveInsights = async (
    businessId,
    insights
) => {

    const savedInsights = [];

    for (const insight of insights) {

        const saved =
            await AIInsight.create({

                business_id: businessId,

                title: insight.title,

                description:
                    insight.description,

                insight_type:
                    insight.type,

                priority:
                    insight.priority
            });


        savedInsights.push(saved);
    }


    return savedInsights;
};