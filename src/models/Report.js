import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Report = sequelize.define(
    "Report",
    {
        report_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        business_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        report_type: {
            type: DataTypes.ENUM(
                "Daily",
                "Weekly",
                "Monthly",
                "Yearly"
            ),
            allowNull: false,
            defaultValue: "Monthly",
        },

        report_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        file_path: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
    },
    {
        tableName: "reports",

        timestamps: true,

        createdAt: "created_at",
        updatedAt: false,
    }
);

export default Report;