import { DataTypes } from "sequelize";
import sequqlize from "../config/database.js";

const AIInsight = sequelize.define(
    "AIInsight",
    {
        insight_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrment: true,
        },
        business_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        insight_type: {
            type: DataTypes.ENUM(
                "Sales",
                "Profit",
                "Product",
                "Cost",
                "Trend",
                "General"
            ),
            defaultValue: "General",
        },

        priority: {
            type: DataTypes.ENUM(
                "Low",
                "Medium",
                "High"
            ),
            defaultValue: "Medium",
        },

        generated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
     {
        tableName: "ai_insights",

        timestamps: false,
    }
);
export default AIInsight;