-- SQL script for creating the Compliance Control table
CREATE TABLE IF NOT EXISTS compliance_control (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
