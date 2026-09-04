-- ============================================================
--  Bizlens — Seed Data
--  Run AFTER schema.sql
--
--  Demo account:
--    Email: sokha@bizlens.com
--    Password: password123
--
--  Demo business:
--    Sokha Coffee
-- ============================================================

USE bizlens_db;


-- ============================================================
-- 1. USERS
-- ============================================================

INSERT INTO users
    (full_name, email, password_hash, role, phone)
VALUES
    (
        'Sokha Owner',
        'sokha@bizlens.com',
        '$2b$10$example_hash_replace_with_real_bcrypt_hash',
        'Business Owner',
        '012 345 678'
    );


-- ============================================================
-- 2. BUSINESS
-- ============================================================

INSERT INTO businesses
    (
        user_id,
        business_name,
        business_type,
        location,
        employee_count,
        years_operating,
        sales_recording_method,
        main_goal
    )
VALUES
    (
        1,
        'Sokha Coffee',
        'Cafe',
        'Phnom Penh',
        '1-5',
        '1-3 years',
        'Excel',
        'Increase sales and increase profit'
    );


-- ============================================================
-- 3. PRODUCTS
-- ============================================================

INSERT INTO products
    (
        business_id,
        name,
        category,
        selling_price,
        cost_price
    )
VALUES
    (1, 'Latte', 'Drink', 2.50, 1.10),
    (1, 'Iced Coffee', 'Drink', 2.50, 1.10),
    (1, 'Chocolate Cake', 'Food', 3.00, 1.60),
    (1, 'Product X', 'Food', 4.00, 3.72);


-- ============================================================
-- 4. SALES
-- ============================================================

INSERT INTO sales
    (
        business_id,
        product_id,
        sale_date,
        quantity,
        selling_price,
        cost_price
    )
VALUES

    -- August 1
    (1, 1, '2026-08-01', 20, 2.50, 1.10),
    (1, 2, '2026-08-01', 15, 2.50, 1.10),
    (1, 3, '2026-08-01', 8,  3.00, 1.60),

    -- August 2
    (1, 1, '2026-08-02', 25, 2.50, 1.10),
    (1, 2, '2026-08-02', 18, 2.50, 1.10),
    (1, 3, '2026-08-02', 10, 3.00, 1.60),

    -- August 3
    (1, 1, '2026-08-03', 30, 2.50, 1.10),
    (1, 2, '2026-08-03', 20, 2.50, 1.10),
    (1, 3, '2026-08-03', 12, 3.00, 1.60),

    -- August 4
    (1, 1, '2026-08-04', 35, 2.50, 1.10),
    (1, 2, '2026-08-04', 22, 2.50, 1.10),
    (1, 3, '2026-08-04', 15, 3.00, 1.60),

    -- Product X
    (1, 4, '2026-08-04', 10, 4.00, 3.72),

    -- August 5
    (1, 1, '2026-08-05', 40, 2.50, 1.10),
    (1, 2, '2026-08-05', 25, 2.50, 1.10),
    (1, 3, '2026-08-05', 18, 3.00, 1.60);


-- ============================================================
-- 5. ADDITIONAL BUSINESS COSTS
-- ============================================================

INSERT INTO costs
    (
        business_id,
        cost_name,
        category,
        amount,
        cost_date,
        description
    )
VALUES
    (
        1,
        'Electricity',
        'Utilities',
        120.00,
        '2026-08-01',
        'Monthly electricity cost'
    ),
    (
        1,
        'Internet',
        'Utilities',
        35.00,
        '2026-08-01',
        'Monthly internet cost'
    ),
    (
        1,
        'Rent',
        'Operations',
        500.00,
        '2026-08-01',
        'Monthly shop rent'
    );


-- ============================================================
-- 6. DIGITAL READINESS ASSESSMENT
-- ============================================================

INSERT INTO digital_assessments
    (
        business_id,
        digital_sales,
        data_management,
        marketing,
        cybersecurity,
        operations,
        total_score
    )
VALUES
    (
        1,
        16,
        10,
        18,
        12,
        12,
        68
    );


-- ============================================================
-- 7. AI INSIGHTS
-- ============================================================

INSERT INTO ai_insights
    (
        business_id,
        title,
        description,
        insight_type,
        priority
    )
VALUES
    (
        1,
        'Revenue is growing faster than costs',
        'Revenue increased by 12.4%, while costs increased by 9.1%. Profit is growing more slowly than sales.',
        'Profit',
        'Medium'
    ),
    (
        1,
        'Product X has a low profit margin',
        'Product X has a significantly lower profit margin than the business average.',
        'Product',
        'High'
    );


-- ============================================================
-- 8. RECOMMENDATIONS
-- ============================================================

INSERT INTO recommendations
    (
        business_id,
        insight_id,
        title,
        description,
        priority,
        impact,
        status
    )
VALUES
    (
        1,
        2,
        'Review Product X pricing',
        'Review the cost or selling price of Product X before increasing its sales volume.',
        'High',
        'High',
        'Pending'
    ),
    (
        1,
        1,
        'Improve Monday sales',
        'Consider testing a promotion or special offer during Monday because sales are below the weekly average.',
        'Medium',
        'Medium',
        'Pending'
    ),
    (
        1,
        NULL,
        'Promote Latte',
        'Latte generates high revenue and strong profit. Consider promoting it during lower-sales periods.',
        'Opportunity',
        'High',
        'Pending'
    );


-- ============================================================
-- 9. REPORT
-- ============================================================

INSERT INTO reports
    (
        business_id,
        report_type,
        report_date
    )
VALUES
    (
        1,
        'Monthly',
        '2026-08-20'
    );