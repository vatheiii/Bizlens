import { Sale, Product } from "../../models/index.js";

export const getProductAnalytics = async (businessId) => {

    const products = await Product.findAll({
        where: {
            business_id: businessId
        }
    });

    const sales = await Sale.findAll({
        where: {
            business_id: businessId
        }
    });


    const productData = {};


    // Initialize products
    for (const product of products) {

        productData[product.product_id] = {

            product_id:
                product.product_id,

            product_name:
                product.name,

            quantity_sold: 0,

            revenue: 0,

            profit: 0
        };
    }


    // Calculate performance
    for (const sale of sales) {

        const product =
            productData[sale.product_id];

        if (!product) continue;


        const quantity =
            Number(sale.quantity);

        const sellingPrice =
            Number(sale.selling_price);

        const costPrice =
            Number(sale.cost_price);


        product.quantity_sold += quantity;

        product.revenue +=
            quantity * sellingPrice;

        product.profit +=
            quantity *
            (sellingPrice - costPrice);
    }


    return Object.values(productData)
        .map(product => ({

            ...product,

            revenue:
                Number(
                    product.revenue.toFixed(2)
                ),

            profit:
                Number(
                    product.profit.toFixed(2)
                )
        }));
};