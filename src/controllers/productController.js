import {Product, Business}from "../models/index.js";

// ============================================================
// CREATE PRODUCT
// POST /api/products
// ============================================================

export const createProduct = async (req,res)=>{
    try{
        const{
            business_id,
            name,
            category,
            selling_price,
            cost_price
        } =req.body;
        const business= await Business.findOne({
            where:{
                business_id,
                user_id:req.user.user_id

            }
        });

        if(!business){
            return res.status(404).json({
                message:"Business not found."
            });
        }
        if(!name || selling_price===undefined || cost_price===undefined){
            return res.status(400).json({
                message:"Name, selling price and cost price are required."
            });
        }
        const product=await Product.create({
            business_id,
            name,
            category,
            selling_price,
            cost_price
        });

        res.status(201).json({
            message:"Product created successfully.",product
        });
    }catch (error){
        console.error(error);

        res.status(500).json({
            message:"Failed to create product",error:error.message
        });
    }
};

// ============================================================
// GET PRODUCTS
// GET /api/products?business_id=1
// ============================================================

export const getProduct=async(req,res)=>{
    try{
        const{business_id}=req.query;
        const business= await Business.findOne({
            where:{
                business_id,
                user_id:req.user.user_id
            }
        });

        if(!business){
            return res.status(404).json({
                message:"Business not found."
            });
        }

        const products= await Product.findAll({
            where:{business_id}
        });

        res.json({products})
    }catch(error){
        res.status(500).json({
            message:"Failed to get products.",
            error:error.message
        });
    }
};

// ============================================================
// GET PRODUCT BY ID
// GET /api/products/:id
// ============================================================

export const getProductById = async(req,res)=>{
    try{
        const product = await Product.findOne({
            where:{
                product_id:req.params.id
            },
            include:{
                model:Business,
                as:"business",
                where:{
                    user_id:req.user.user_id
                }
            }
        });

        if(!product){
            return res.status(404).json({
                message:"Product not found."
            });
        }
        res.json({
            product
        });
    }catch(error){
        res.status(500).json({
            message:"Failed to get product.",error: error.message
        });
    }
};


// ============================================================
// UPDATE PRODUCT
// ============================================================


export const updateProduct = async(req,res)=>{
    try{
        const product= await Product.findOne({
            where:{
                product_id: req.params.id
            },
            include:{
                model:Business,
                as:"business",
                where:{
                    user_id: req.user.user_id
                }
            }
        });

        if(!product){
           return res.status(404).json({
            message:"Product not found."
           });
        }

        await product.update(req.body);
        res.json({
            message:"Product updated successfully.",product
        });
    }catch (error) {
        res.status(500).json({
            message: "Failed to update product.",
            error: error.message
        });
    }
};

// ============================================================
// DELETE PRODUCT
// DELETE /api/products/:id
// ============================================================

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                product_id: req.params.id
            },
            include: {
                model: Business,
                as: "business",
                where: {
                    user_id: req.user.user_id
                }
            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found."
            });
        }

        await product.destroy();

        res.json({
            message: "Product deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete product.",
            error: error.message
        });
    }
};