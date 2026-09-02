import dotenv from "dotenv";
import app from './app.js';
import sequelize from "./config/database.js";

dotenv.config();

const PORT= process.env.PORT || 5000;
const startServer= async ()=>{
    try{
        await sequelize.authenticate();
        console.log("MySQL database connected");
        app.listen(PORT,()=>{
            console.log(`Bizlens server running on port ${PORT}`);
            console.log(`http://localhost:${PORT}`);
        });
    }catch(error){
        console.error("Database connection failed: ");
        console.error(error.message);
    }
};
startServer();