import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Recommendation = sequelize.define(
    "Recommendation",
    {
        recommendation_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        business_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        insight_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        priority: {
            type: DataTypes.ENUM(
                "High",
                "Medium",
                "Opportunity"
            ),
            allowNull: false,
            defaultValue: "Medium",
        },

        impact: {
            type: DataTypes.ENUM(
                "High",
                "Medium",
                "Low"
            ),
            defaultValue: "Medium",
        },

        status: {
            type: DataTypes.ENUM(
                "Pending",
                "In Progress",
                "Completed",
                "Dismissed"
            ),
            defaultValue: "Pending",
        },
    },
    {
        tableName: "recommendations",

        timestamps: true,

        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Recommendation;