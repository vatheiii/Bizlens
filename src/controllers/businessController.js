import {Business} from "../models/index.js";

// ============================================================
// CREATE BUSINESS
// POST /api/businesses
// ============================================================

export const createBusiness = async (req, res) => {
    try{
        const{
            business_name,
            business_type,
            location,
            employee_count,
            years_operating,
            sales_recording_method,
            main_goal
        }= req.body;

        if(!business_name || !business_type){
            return res.status(400).json({
                message:"Business name and type are required"
            });
        }

        const business= await Business.create({
            user_id: req.user.user_id,
            business_name,
            business_type,
            location,
            employee_count,
            years_operating,
            sales_recording_method,
            main_goal
        });

        res.status(201).json({
            message:"Business created successfully",
            business});
    }catch(error){
       console.error(error);

       res.status(500).json({
        message:"Failed to create business",
        error: error.message
       });
    }
};

// ============================================================
// GET MY BUSINESSES
// GET /api/businesses
// ============================================================

export const getBusinesses = async (req, res) => {
    try{
        const businesses = await Business.findAll({
            where: {user_id: req.user.user_id}
        });
        res.json({businessws});
    }catch(error){
        res.status(500).json({
            message:"Failed to get businesses.", error: error.message
        });
    }
};

// ============================================================
// GET BUSINESS BY ID
// GET /api/businesses/:id
// ============================================================

export const getBusinessById = async (req,res)=>{
    try{
        const business= await Business.findOne({
            where:{
                business_id: req.params.id,
                user_id: req.user.user_id
            }
        });
        if(!business){
            return res.status(404).json({
                message:"Business not found"
            });
        }
        res.json({business});
    }catch(error){
        res.status(500).json({
            message:"Failed to get business.", error: error.message
        });
    }
}

// ============================================================
// UPDATE BUSINESS
// PUT /api/businesses/:id
// ============================================================

export const updateBusiness= async (req,res)=>{
    try{
        const business= await Business.findOne({
            where:{
                business_id: req.params.id,
                user_id:req.user.user_id
            }
        });
        if(!business){
            return res.status(404).json({
                message:"Business not found."
            });
        }
        await business.update(req.body);
        res.json({
            message:"Business updated successfully.", business
        });
    }catch (error){
        res.status(500).json({
            message:"Failed to update business.", error: error.message
        });
    }
};

// ============================================================
// DELETE BUSINESS
// DELETE /api/businesses/:id
// ============================================================

export const deleteBusiness= async(req,res)=>{
    try{
        const business= await Business.findOne({
            where:{
                business_id: req.params.id,
                user_id:req.user.user_id
            }
        });
        if(!business){
            return res.status(404).json({
                message:"Business not found."
            });
        }
        await business.destroy();
        res.json({message:"Business deleted successfully."})
    }catch(error){
        res.status(500).json({
            messge:"Failed to delete business.", error: error.message
        });
    }
}