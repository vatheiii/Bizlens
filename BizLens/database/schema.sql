-- ============================================================
--  Bizlens — Database Schema
--  AI-Powered Business Intelligence for Cambodian Small Business
--
--  Database:
--    bizlens_db
--
--  Main modules:
--    1. Users
--    2. Businesses
--    3. Products
--    4. Sales
--    5. Costs
--    6. Digital Readiness
--    7. AI Insights
--    8. Recommendations
--    9. Reports
-- ============================================================


-- ============================================================
--  DATABASE
-- ============================================================


CREATE DATABASE IF NOT EXISTS bizlens_db;

USE bizlens_db;
-- ============================================================
-- 1. USERS
--    Stores Bizlens account information.
-- ============================================================
CREATE TABLE users(
  user_id int INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'Business Owner') NOT NULL DEFAULT 'Business Owner',
  phone VARCHAR(30),
  crated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- 2. BUSINESSES
--    Stores the business profile created by the owner.
-- ============================================================
CREATE TABLE business(
    business_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    business_name VARCHAR(150) NOT NULL,
    business_type VARCHAR(100) NOT NULL,
    location_place VARCHAR(150),
    employee_count varchar(50),
    years_operating VARCHAR(50),
    sales_recording_method VARCHAR,
    main_goal VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_business_user FOREIGN KEY (user_id) REFERENCES users(user_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- ============================================================
-- 3. PRODUCTS
--    Stores products/services sold by the business.
-- ============================================================
CREATE TABLE products(
    product_id INT AUTO_INCREMENT PRIOMARY KEY,
    business_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100),
    selling_price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_product_selling_price
      CHECK(selling_price >= 0),
    CONSTRAINT chk_product_cost_price
      CHECK(cost_price >=0),
    CONSTRAINT fk_product_business
    FOREIGN KEY (business_id) REFERENCES businesses(business_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- ============================================================
-- 4. SALES
--    Stores individual sales transactions.
-- ============================================================
CREATE TABLE sales(
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    business_id INT NOT NULL,
    product_id INT NOT NULL,
    sale_date DATE NOT NULL,
    quantity INT NOT NULL,
    selling_price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_sale_quantity CHECK (quantity > 0),
    CONSTRAINT chk_sale_selling_price CHECK (selling_price >=0),
    CONSTRAINT chk_sale_cost_price CHECK (cost_price >=0),
    CONSTRAINT fk_sale_business FOREIGN KEY (business_id) REFERENCES businesses(business_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_sale_product FOREIGN KEY (product_id) REFERENCES products(product_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- ============================================================
-- 5. COSTS
--    Stores additional business expenses.
--
--    Examples:
--    Rent, Electricity, Salary, Internet, Transportation
-- ============================================================

CREATE TABLE costs(
     cost_id INT AUTO_INCREMENT PRIMARY KEY,
     business_id INT NOT NULL,
     cost_name VARCHAR(150) NOT NULL,
     category VARCHAR(100) NOT NULL,
     amount DECIMAL(10,2) NOT NULL,
     cost_data DATE NOT NULL,
     description TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     CONSTRAINT chk_cost_amount CHECK (amount >=0),
     CONSTRAINT fk_cost_business
       FOREIGN KEY (business_id) REFERENCES businesses(business_id)
       ON DELETE CASCADE
       ON UPDATE CASCADE

);

-- ============================================================
-- 6. DIGITAL ASSESSMENTS
--    Stores Digital Readiness assessment results.
--
--    Areas:
--    - Digital Sales
--    - Data Management
--    - Marketing
--    - Cybersecurity
--    - Operations
-- ============================================================

CREATE TABLE digital_assessments(
     assessment_id INT NOT NULL,
     business_id INT NOT NULL,
     digital_sales INT NOT NULL DEFAULT 0,
     data_management INT NOT NULL DEFAULT 0,
     marketing INT NOT NULL DEFAULT 0,
     cybersecurity INT NOT NULL DEFAULT 0,
     Operations INT NOT NULL DEFAULT 0,
     total_score INT NOT NULL DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

     CONSTRAINT chk_digital_sales CHECK (digital_sales BETWEEN 0 AND 20),
     CONSTRAINT chk_data_management CHECK (data_management BETWEEN 0 AND 20),
     CONSTRAINT chk_marketing CHECK (marketing BETWEEN 0 AND 20),
     CONSTRAINT chk_cybersecurity CHECK (cybersecurity BETWEEN 0 AND 20),
     CONSTRAINT chk_operations CHECK (operations BETWEEN 0 AND 20),
     CONSTRAINT chk_total_score CHECK (total_score between 0 and 100),
     CONSTRAINT fk_assessment_business FROEIGN KEY (business_id) REFERENCES businesses(business_id)
     ON DELETE CASCADE
     ON UPDATE CASCADE

);
-- ============================================================
-- 7. AI INSIGHTS
--    Stores AI-generated business observations.
--
--    Example:
--    "Product X has a 7% profit margin compared
--     with the business average of 19.5%."
-- ============================================================
CREATE TABLE ai_insights(
    insight_id INT AUTO_INCREMENT PRIMARY KEY,
    nusiness_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    insight type ENUM('Sales',
        'Profit',
        'Product',
        'Cost',
        'Trend',
        'General') Default 'General',
        priority ENUM(
        'Low',
        'Medium',
        'High'
    ) DEFAULT 'Medium',

    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_insight_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(business_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ============================================================
-- 8. RECOMMENDATIONS
--    Stores actionable recommendations generated by Bizlens.
--
--    Priority:
--      High Priority
--      Medium Priority
--      Opportunity
-- ============================================================
CREATE TABLE recommendations(
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
    business_id INT NOT NULL,
    insight_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority ENUM('High','Medium','Opportunity') NOT NULL DFAULT 'Medium',
    impact ENUM(
        'High',
        'Medium',
        'Low'
    ) DEFAULT 'Medium',

    status ENUM(
        'Pending',
        'In Progress',
        'Completed',
        'Dismissed'
    ) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_recommendation_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(business_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_recommendation_insight
        FOREIGN KEY (insight_id)
        REFERENCES ai_insights(insight_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);
-- ============================================================
-- 9. REPORTS
--    Stores generated business reports.
-- ============================================================

CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,

    business_id INT NOT NULL,

    report_type ENUM(
        'Daily',
        'Weekly',
        'Monthly',
        'Yearly'
    ) NOT NULL DEFAULT 'Monthly',

    report_date DATE NOT NULL,

    file_path VARCHAR(500),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_report_business
        FOREIGN KEY (business_id)
        REFERENCES businesses(business_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================================
-- INDEXES
--    Improve query performance.
-- ============================================================

CREATE INDEX idx_business_user
    ON businesses(user_id);

CREATE INDEX idx_products_business
    ON products(business_id);

CREATE INDEX idx_sales_business_date
    ON sales(business_id, sale_date);

CREATE INDEX idx_sales_product
    ON sales(product_id);

CREATE INDEX idx_costs_business_date
    ON costs(business_id, cost_date);

CREATE INDEX idx_insights_business
    ON ai_insights(business_id);

CREATE INDEX idx_recommendations_business
    ON recommendations(business_id);

CREATE INDEX idx_recommendations_status
    ON recommendations(business_id, status);

CREATE INDEX idx_reports_business_date
    ON reports(business_id, report_date);