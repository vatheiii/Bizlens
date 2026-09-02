import {DataTypes} from "sequelize";
import sequelize from "../config/database.js";

const Business = sequqlize.define(
    "Business",
    {
        business_id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        user_id:{
            type:DataTypes.STRING(150),
            allowNull:false,
        },
        business_type:{
            type:DataTypes.STRING(100),
            allowNull:false,

        }, 
        location:{
            type:DataTypes.STRING(150),
            allowNull: true,
        },
        years_operating:{
            type:DataTypes.STRING(50),
            allowNull:true,
        },
        sales_recording_method:{
            type: DataTypes.STRING(100),
            allowNull:true,
        },
        main_goal:{
            type:DataTypes.STRING(255),
            allowNull:true,
        },
    },
    {
        tableName: "businesses",
        timestamps:true,
        createdAt:"created_at",
        updateAt:"updated_at",
    }
);
export default Business;