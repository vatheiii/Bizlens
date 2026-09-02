import bcrypt from  "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../models/index.js";

// ============================================================
// REGISTER
// ============================================================

export const register= async(req,res)=>{
    try{
        const{
            full_name,
            email,
            password,
            phone
        }=req.body;
          
        // 1. Validate required fields
        
        if(!full_name|| !email|| !password){
            return res.status(400).json({
                message:"Full name, email and password are required."
            });
        }
       
        // 2. Check if email already exists
        
         const existingUser= await User.findOne({
            where: {email}
         });
         if(existingUser){
            return res.status(409).json({
                message:"Email is already registered."
            });
         }
         const password_hash = await bcrypt.hash(password,10);   //hash password
         /*Create User*/
         const user = await User.create({
            full_name,
            email,password_hash,
            phone,
            role:"Business Owner"
         });
        
          // 5. Return user information
         //    Do NOT return password_hash
        
         return res.status(201).json({
            message:"Registration successful.",
            user:{
                user_id  :user.user_id,
                full_name: user.full_name,
                email    :user.email,
                role     :user.role,
                phone    :user.phone
            }
         });
    }catch(error){
        console.error("Register error:",error);
        return res.status(500).json({
            message:"Registration failed.", error: error.message
        });
    }
};
// ============================================================
// LOGIN
// ============================================================

export const login =async (req,res)=>{
    try{
        const{
            email,
            password
        } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message:"Email and password are required."
            });
        }
        const user= await User.findOne({
            where: {email}
        });
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password."
            })
        }
        const isPasswordCorrect = await bcrypt.compare( password, user.password_hash);
        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "Invalid email or ppassword."
            })
        }
        // ----------------------------------------------------
        // 4. Create JWT
        // ----------------------------------------------------
        const token= jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );
        return res.status(200).json({
            message:"Login successful.",
            token,
            user:{
                user_id: user.user_id,
                full_name: user.full_name,
                email:user.email,
                role: user.role,
                phone: user.phone
            }
        })
    }catch(error){
        console.error("Login error:",error);

        return res.status(500).json({
            message: "Login failed.",
            error:error.message
        });
    }
}