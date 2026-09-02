import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const DigitalAssessment = sequelize.define(
    "DigitalAssessment",
    {
        assessment_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        business_id:{
            type:DataTypes.INTEGER,
            allowNuLL: false
        },
        digital_sales:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            validate:{
                min:0,
                max:20,
            },
        },
        data_management:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            validate:{
                min:0,
                max:20,
            },
        },
        marketing:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            validate:{
                min:0,
                max:20,
            },
        },

        cybersecurity:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            validate:{
                min:0,
                max:20,
            },
        },
        operations:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0,
            validate:{
                min:0,
                max:20,
            },
        },
        total_score:{
            type:DataTypes.INTEGER,
            allowNuLL: false,
            defaultValue:0,
            validate:{
                min:0,
                max:100,
            },
        },
         
    },
    {
        tableName: "digital_assessments",

        timestamps: true,

        createdAt: "created_at",
        updatedAt: false,
    }
);
export default DigitalAssessment;