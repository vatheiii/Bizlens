import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
    "Product",
    {
        product_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        business_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        name:{
            type:DataTypes.STRING(150),
            allowNull: false,
        },
        category:{
            type:DataTypes.STRING(100),
            allowNull: true,
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
        is_active:{
            type:DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "products",
        timestamps:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
    }
);
export default Product;
