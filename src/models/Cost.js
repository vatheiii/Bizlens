import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Cost=sequelize.define(
    "Cost",
    {
        cost_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        business_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        cost_name:{
            type:DataTypes.STRING(150),
            allowNull:false,
        },
        category:{
            type:DataTypes.STRING(100),
            allowNull: true,
        },
        amount:{
            type:DataTypes.DECIMALO(10,2),
            allowNull: false,
            validate:{
                min:0,
            },
        },
        cost_date:{
            type:DataTypes.DATEONLY,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
    },
    {
        tableName:"costs",
        timestamps:true,
        createdAt:"created_at",
        updateAt: false,
    }
);
export default Cost;
