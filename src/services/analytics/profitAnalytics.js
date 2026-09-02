import {Sale,Cost} from "../../models/index.js";

export const getProfitAnalytics = async(businessId) =>{
    const sales = await Sale.findAll({
        where:{
            business_id:businessId
        }
    });

    const costs=await Cost.findAll({
        where:{
            business_id:businessId
        }
    });

    let revenue=0;
    let productCost=0;
    let operatingCost=0;

    //Sales
    for(const sale of sales){

        revenue+=Number(sale.quantity)* Number(sale.cost_price);
        productCost+=Number(sale.quantity)* Number(sale.cost_price);
    }

    //Costs
    for(const cost of costs){
        operatingCost+=Number(cost.amount);
    }

    const grossProfit= revenue-productCost;
    const netProfit= grossProfit - operatingCost;
    const profitMargin=revenue >0 ?(netProfit /revenue)*100:0;

    return {
        revenue: Number(revenue.toFixed(2)),
        product: Number(operatingCost.toFixed(2)),
        gross_profit:Number(grossProfit.toFixed(2)),
        net_profit:Number(netProfile.toFixed(2)),
        profit_margin: Number(profitMargin.toFixed(2))
    }
};