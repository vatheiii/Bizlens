import {Sale} from "../../models/index.js";

export const getSalesAnalytics = async(businessId)=>{
    const sales = await Sale.findAll({
        where:{
            business_id:business
        }
    });

    let totalRevenue =0;
    let totalQuantity =0;
    for(const sale of sales){
        totalRevenue += Number(sale.quantity)* Number(sale.selling_price);
        totalQuery += Number(sale.quantity);
    }

    return{
        total_sales: sales.length,
        total_quantity:totalQuantity,
        total_revenue: Number(totalRevenue.toFixed(2))
    };
};