import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User=sequelize.define(
    "User",
    {
        user_id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,

        },
        full_name:{
            type:DataTypes.STRING(100),
            allowNull: false,

        },
        email:{
            type:DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        password_hash:{
            type:DataTypes.STRING(255),
            allowNull: false,
        },
        role:{
            type: DataTypes.ENUM("Admin","Business Owner"),
            defaultValue: "Business Owner",
        },

        phone:{
            type:DataTypes.STRING(30),
            allowNull: true,
        },

    },
    {
        tableName : "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",

    }
);
export default User;