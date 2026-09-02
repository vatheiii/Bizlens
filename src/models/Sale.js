import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Sale = sequqlize.define(
    "Sale",
    {
        sale_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        business_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        product_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        sale_date:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                min:1,
            },
        },
        selling_price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate:{
                min:0,
            },
        },
        cost_price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull: false,
            validate:{
                min:0,
            },
        },
    },
    {
        tableName: "sales",
        timestamps: true,
        createdAt:"created_at",
        updateAt: false,
    }
);
export default Sale;