import {
    getSalesAnalytics
} from "./salesAnalytics.js";

import {
    getProfitAnalytics
} from "./profitAnalytics.js";

import {
    getCostAnalytics
} from "./costAnalytics.js";

import {
    getProductAnalytics
} from "./productAnalytics.js";


export const getCompleteAnalytics = async (
    businessId
) => {

    const sales =
        await getSalesAnalytics(
            businessId
        );

    const profit =
        await getProfitAnalytics(
            businessId
        );

    const costs =
        await getCostAnalytics(
            businessId
        );

    const products =
        await getProductAnalytics(
            businessId
        );


    return {

        sales,

        profit,

        costs,

        products
    };
};