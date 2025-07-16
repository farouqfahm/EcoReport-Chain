-- Firestore Collections Schema for EcoReport Platform
-- This represents the structure that would be implemented in Firestore

-- Users Collection
-- Collection: users
-- Document ID: user_phone_number or user_id
CREATE TABLE IF NOT EXISTS users_schema (
    id VARCHAR(50) PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    lga VARCHAR(100) NOT NULL,
    wallet_address VARCHAR(200),
    eco_score INTEGER DEFAULT 0,
    reports_submitted INTEGER DEFAULT 0,
    reports_validated INTEGER DEFAULT 0,
    is_validator BOOLEAN DEFAULT FALSE,
    validator_rank INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);

-- Reports Collection  
-- Collection: reports
-- Document ID: auto-generated
CREATE TABLE IF NOT EXISTS reports_schema (
    id VARCHAR(50) PRIMARY KEY,
    reporter_id VARCHAR(50) NOT NULL,
    incident_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location_lat DECIMAL(10, 8) NOT NULL,
    location_lng DECIMAL(11, 8) NOT NULL,
    location_address VARCHAR(200),
    geohash VARCHAR(20), -- For efficient geo queries
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    ai_confidence DECIMAL(3, 2),
    ai_predicted_label VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending', -- pending, verified, rejected
    validation_count INTEGER DEFAULT 0,
    required_validations INTEGER DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    blockchain_tx_hash VARCHAR(100),
    tokens_awarded INTEGER DEFAULT 0
);

-- Validations Collection
-- Collection: validations  
-- Document ID: auto-generated
CREATE TABLE IF NOT EXISTS validations_schema (
    id VARCHAR(50) PRIMARY KEY,
    report_id VARCHAR(50) NOT NULL,
    validator_id VARCHAR(50) NOT NULL,
    is_valid BOOLEAN NOT NULL,
    confidence_score DECIMAL(3, 2),
    comments TEXT,
    validation_time INTEGER, -- seconds taken to validate
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tokens_earned INTEGER DEFAULT 0
);

-- Transactions Collection
-- Collection: blockchain_transactions
-- Document ID: transaction_hash
CREATE TABLE IF NOT EXISTS transactions_schema (
    tx_hash VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- mint, redeem, transfer
    amount INTEGER NOT NULL, -- positive for mint, negative for redeem
    report_id VARCHAR(50), -- for mint transactions
    reward_type VARCHAR(50), -- for redeem transactions
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    metadata JSON
);

-- Rewards Collection
-- Collection: rewards
-- Document ID: auto-generated
CREATE TABLE IF NOT EXISTS rewards_schema (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    cost INTEGER NOT NULL, -- in EcoTokens
    provider VARCHAR(100) NOT NULL,
    category VARCHAR(50), -- mobile, environmental, cash
    is_available BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT -1, -- -1 for unlimited
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System Logs Collection
-- Collection: system_logs
-- Document ID: auto-generated  
CREATE TABLE IF NOT EXISTS system_logs_schema (
    id VARCHAR(50) PRIMARY KEY,
    log_type VARCHAR(50) NOT NULL, -- ai_validation, blockchain, ussd, error
    message TEXT NOT NULL,
    severity VARCHAR(20) DEFAULT 'info', -- info, warning, error, critical
    user_id VARCHAR(50),
    report_id VARCHAR(50),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Geospatial Indexes for efficient location queries
-- In Firestore, this would be implemented using geohash indexing
CREATE INDEX IF NOT EXISTS idx_reports_geohash ON reports_schema(geohash);
CREATE INDEX IF NOT EXISTS idx_reports_location ON reports_schema(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports_schema(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports_schema(created_at);

-- User performance indexes
CREATE INDEX IF NOT EXISTS idx_users_eco_score ON users_schema(eco_score DESC);
CREATE INDEX IF NOT EXISTS idx_users_lga ON users_schema(lga);
CREATE INDEX IF NOT EXISTS idx_users_validator ON users_schema(is_validator);

-- Validation workflow indexes
CREATE INDEX IF NOT EXISTS idx_validations_report ON validations_schema(report_id);
CREATE INDEX IF NOT EXISTS idx_validations_validator ON validations_schema(validator_id);

-- Transaction tracking indexes
CREATE INDEX IF NOT EXISTS idx_transactions_user ON transactions_schema(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions_schema(transaction_type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions_schema(status);

-- Sample data insertion
INSERT INTO users_schema (id, phone, name, lga, wallet_address, eco_score, reports_submitted, is_validator) VALUES
('user_001', '+234-801-234-5678', 'Adebayo Martins', 'Lagos Island', 'addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2f', 2450, 49, TRUE),
('user_002', '+234-802-345-6789', 'Fatima Abdullahi', 'Lagos Island', 'addr_test1qr3gx8vk9mjzqp5xc2dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2g', 2100, 42, TRUE),
('user_003', '+234-803-456-7890', 'Chidi Okafor', 'Lagos Island', 'addr_test1qs4hy9wl0nkzqr6yd3dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2h', 1890, 38, TRUE);

INSERT INTO reports_schema (id, reporter_id, incident_type, description, location_lat, location_lng, location_address, geohash, status, ai_confidence, tokens_awarded) VALUES
('report_001', 'user_001', 'flood', 'Severe flooding on Ahmadu Bello Way after heavy rainfall', 6.5244, 3.3792, 'Victoria Island, Lagos', 's171w3', 'verified', 0.92, 50),
('report_002', 'user_002', 'pollution', 'Industrial waste discharge into canal system', 6.4281, 3.4219, 'Surulere, Lagos', 's171x4', 'pending', 0.78, 0),
('report_003', 'user_003', 'wind_damage', 'Trees fallen due to strong winds blocking major road', 6.6018, 3.3515, 'Ikeja, Lagos', 's172y5', 'verified', 0.95, 50);

INSERT INTO rewards_schema (id, title, description, cost, provider, category, is_available) VALUES
('reward_001', 'Mobile Data 1GB', '1GB data bundle for MTN network', 25, 'MTN Nigeria', 'mobile', TRUE),
('reward_002', 'Airtime ₦500', '500 Naira airtime credit', 30, 'Airtel Nigeria', 'mobile', TRUE),
('reward_003', 'Tree Planting Kit', 'Complete tree planting kit with seeds and tools', 100, 'EcoPartner NGO', 'environmental', TRUE),
('reward_004', 'Solar Lamp', 'Portable solar-powered LED lamp', 200, 'GreenTech Solutions', 'environmental', FALSE);

-- Analytics Views for Admin Dashboard
CREATE VIEW user_statistics AS
SELECT 
    lga,
    COUNT(*) as total_users,
    COUNT(CASE WHEN is_validator = TRUE THEN 1 END) as validators,
    AVG(eco_score) as avg_eco_score,
    SUM(reports_submitted) as total_reports
FROM users_schema 
GROUP BY lga;

CREATE VIEW report_analytics AS
SELECT 
    incident_type,
    COUNT(*) as total_reports,
    COUNT(CASE WHEN status = 'verified' THEN 1 END) as verified_reports,
    AVG(ai_confidence) as avg_ai_confidence,
    AVG(validation_count) as avg_validation_time
FROM reports_schema 
GROUP BY incident_type;

-- Cleanup and maintenance procedures
-- These would be implemented as Cloud Functions in Firebase
DELIMITER //
CREATE PROCEDURE cleanup_old_logs()
BEGIN
    DELETE FROM system_logs_schema 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
END //

CREATE PROCEDURE update_user_scores()
BEGIN
    UPDATE users_schema u
    SET eco_score = (
        SELECT COALESCE(SUM(tokens_awarded), 0)
        FROM reports_schema r
        WHERE r.reporter_id = u.id AND r.status = 'verified'
    ) + (
        SELECT COALESCE(SUM(tokens_earned), 0)
        FROM validations_schema v
        WHERE v.validator_id = u.id
    );
END //
DELIMITER ;
