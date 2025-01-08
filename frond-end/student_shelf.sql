-- Create the database
CREATE DATABASE student_shelf;

-- Use the database
USE student_shelf;

-- Create the users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each user
    name VARCHAR(255) NOT NULL,                        -- User's name (required at registration)
    email VARCHAR(255) NOT NULL UNIQUE,                -- User's email (required at registration)
    password_hash VARCHAR(255) NOT NULL,               -- Hashed password (required at registration)
    student_number VARCHAR(50) NOT NULL UNIQUE,        -- Unique student number (required at registration)
    phone_number VARCHAR(20) DEFAULT NULL,             -- Optional phone number
    bio TEXT DEFAULT NULL,                             -- Optional user bio
    policy TEXT DEFAULT NULL,                          -- Optional policy
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of account creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp of last update
);

-- Create the categories table
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each category
    name VARCHAR(255) NOT NULL,                        -- Name of the category (e.g., "product", "service")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP     -- Timestamp of category creation
);

CREATE TABLE sub_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);


-- Create the listings table
CREATE TABLE listings (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each listing
    title VARCHAR(255) NOT NULL,                       -- Title of the listing
    description TEXT NOT NULL,                         -- Description of the listing
    price DECIMAL(10, 2) NOT NULL,                     -- Price of the listing
    user_id INT NOT NULL,                              -- Foreign key to users table
    category_id INT NOT NULL,                          -- Foreign key to categories table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of listing creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp of last update
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create the reviews table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each review
    listing_id INT NOT NULL,                           -- Foreign key to listings table
    user_id INT NOT NULL,                              -- Foreign key to users table (reviewer)
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5), -- Rating (1-5 stars)
    message TEXT NOT NULL,                             -- Review message
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of review creation
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the messages table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each message
    sender_id INT NOT NULL,                            -- Foreign key to users table (sender)
    receiver_id INT NOT NULL,                          -- Foreign key to users table (receiver)
    content TEXT NOT NULL,                             -- Message content
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of message creation
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the orders table (if buying/selling requires tracking transactions)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each order
    listing_id INT NOT NULL,                           -- Foreign key to listings table
    buyer_id INT NOT NULL,                             -- Foreign key to users table (buyer)
    seller_id INT NOT NULL,                            -- Foreign key to users table (seller)
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending', -- Order status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of order creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Timestamp of last update
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the notifications table (optional, for system notifications)
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,                 -- Unique identifier for each notification
    user_id INT NOT NULL,                              -- Foreign key to users table (receiver of the notification)
    message TEXT NOT NULL,                             -- Notification message
    is_read BOOLEAN DEFAULT FALSE,                     -- Read status of the notification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,    -- Timestamp of notification creation
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);




-- Insert Categories
INSERT INTO category (name, created_at, updated_at)
VALUES
('product', NOW(), NOW()),
('service', NOW(), NOW());

-- Insert Subcategories
INSERT INTO subcategory (category_id, name, created_at, updated_at)
VALUES
-- Subcategories for Product
(1, 'Electronics', NOW(), NOW()),
(1, 'Books', NOW(), NOW()),
-- Subcategories for Service
(2, 'Tutoring', NOW(), NOW()),
(2, 'Event Planning', NOW(), NOW());

-- Insert User
INSERT INTO user (name, email, password_hash, student_number, campus, phone_number, profile_image_url, bio, policy, rating, created_at, updated_at)
VALUES
(
    'John Doe',
    'johndoe@example.com',
    '$2a$10$E8fgH1MEtqxllnQehnR2yOThERHlvA3U8i3BaFt.pBVxVVFXcMWFy', 
    'S12345678',
    'Main Campus',
    '123-456-7890',
    '/uploads/avatar.png',
    'Hello! I am a test user.',
    'User policy text here.',
    4.5,
    NOW(),
    NOW()
);

-- Insert Listings
INSERT INTO listing (user_id, category_id, subcategory_id, title, description, price, status, is_active, created_at, updated_at)
VALUES
-- Product Listing
(1, 1, NULL, 'Laptop for Sale', 'A lightly used laptop.', 500.00, 'active', TRUE, NOW(), NOW()),
-- Service Listing
(1, 2, NULL, 'Tutoring Service', 'Math tutoring for high school students.', 25.00, 'active', TRUE, NOW(), NOW());

-- Insert Reviews
INSERT INTO review (listing_id, reviewer_id, reviewed_user_id, category, message, rating, created_at)
VALUES
(1, 2, 1, 'product', 'Great seller!', 5, NOW());

-- Insert Notifications
INSERT INTO notification (user_id, title, message, is_read, created_at)
VALUES
(1, 'Welcome to Student Shelf!', 'Thanks for signing up, John!', FALSE, NOW());

-- Insert Messages
INSERT INTO message (sender_id, receiver_id, listing_id, message_content, created_at)
VALUES
(2, 1, 1, 'Hi, is the laptop still available?', NOW());
