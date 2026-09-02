import User from "./User.js";
import Business from "./Business.js";
import Product from "./Product.js";
import Sale from "./Sale.js";
import Cost from "./Cost.js";
import DigitalAssessment from "./DigitalAssessment.js";
import AIInsight from "./AIInsight.js";
import Recommendation from "./Recommendation.js";
import Report from "./Report.js";


// ============================================================
// USER → BUSINESS
// ============================================================

User.hasMany(Business, {
    foreignKey: "user_id",
    as: "businesses",
});

Business.belongsTo(User, {
    foreignKey: "user_id",
    as: "owner",
});


// ============================================================
// BUSINESS → PRODUCTS
// ============================================================

Business.hasMany(Product, {
    foreignKey: "business_id",
    as: "products",
});

Product.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
});


// ============================================================
// BUSINESS → SALES
// ============================================================

Business.hasMany(Sale, {
    foreignKey: "business_id",
    as: "sales",
});

Sale.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
});


// ============================================================
// PRODUCT → SALES
// ============================================================

Product.hasMany(Sale, {
    foreignKey: "product_id",
    as: "sales",
});

Sale.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});


// ============================================================
// BUSINESS → COSTS
// ============================================================

Business.hasMany(Cost, {
    foreignKey: "business_id",
    as: "costs",
});

Cost.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
});


// ============================================================
// BUSINESS → DIGITAL ASSESSMENTS
// ============================================================

Business.hasMany(DigitalAssessment, {
    foreignKey: "business_id",
    as: "digitalAssessments",
});

DigitalAssessment.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
});


// ============================================================
// BUSINESS → AI INSIGHTS
// ============================================================

Business.hasMany(AIInsight, {
    foreignKey: "business_id",
    as: "aiInsights",
});

AIInsight.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
});


// ============================================================
// BUSINESS → RECOMMENDATIONS
// ============================================================

Business.hasMany(Recommendation, {
    foreignKey: "business_id",
    as: "recommendations",
});

Recommendation.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
});


// ============================================================
// AI INSIGHT → RECOMMENDATIONS
// ============================================================

AIInsight.hasMany(Recommendation, {
    foreignKey: "insight_id",
    as: "recommendations",
});

Recommendation.belongsTo(AIInsight, {
    foreignKey: "insight_id",
    as: "insight",
});


// ============================================================
// BUSINESS → REPORTS
// ============================================================

Business.hasMany(Report, {
    foreignKey: "business_id",
    as: "reports",
});

Report.belongsTo(Business, {
    foreignKey: "business_id",
    as: "business",
});


export {
    User,
    Business,
    Product,
    Sale,
    Cost,
    DigitalAssessment,
    AIInsight,
    Recommendation,
    Report,
};