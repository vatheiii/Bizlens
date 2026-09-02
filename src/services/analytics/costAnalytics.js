import {Cost} from '../../models/index.js';

export const getCostAnalytics=async(businessId)=>{
    const costs =await Cost.findAll({
        where:{
            business_id:businessId
        }
    });

    let totalCost=0;
    const categoryTotals={};

    for(const cost of costs){
        const amount = Number(cost.amount);
        totalCost+= amount;

        const category=cost.category ||"Other";

        if(!categoryTotals[category]){
            categoryTotals[category]=0;
        }
        categoryTotals[category]+=amount;
    }

    return{
        total_cost:Number(totalCost.toFixed(2)),
        by_category:Object.entries(categoryTotals).map(([category,amount])=>({
            category, amount:Number(amount.toFixed(2))
        }))
    }
};