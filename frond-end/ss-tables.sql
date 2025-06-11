-- Adminer 4.8.1 MySQL 10.4.28-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `ActivityLogs`;
CREATE TABLE `ActivityLogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `activitylogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `Contacts`;
CREATE TABLE `Contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Contacts_userId_foreign_idx` (`userId`),
  CONSTRAINT `Contacts_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `Favorites`;
CREATE TABLE `Favorites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `favoriteUserId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `favoriteUserId` (`favoriteUserId`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`favoriteUserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `Flags`;
CREATE TABLE `Flags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) NOT NULL,
  `comment` text DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `listingId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `listingId` (`listingId`),
  CONSTRAINT `flags_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `flags_ibfk_2` FOREIGN KEY (`listingId`) REFERENCES `Listings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Listings`;
CREATE TABLE `Listings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `subcategory` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `coverImage` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `Messages`;
CREATE TABLE `Messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `messageText` text DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `read` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `senderId` (`senderId`),
  KEY `receiverId` (`receiverId`),
  CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`senderId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiverId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `Notifications`;
CREATE TABLE `Notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `isRead` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sellerId` int(11) NOT NULL,
  `buyerId` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sellerId` (`sellerId`),
  KEY `buyerId` (`buyerId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`sellerId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`buyerId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `campus` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `policy` text DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `rating` decimal(10,0) DEFAULT NULL,
  `activeListings` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 1,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- 2025-06-09 17:10:34



-- Bajpex-cajnyz-dykpa5




------ Postgres converted query for supabase ---------

-- Drop tables if they exist (order matters due to foreign keys)
DROP TABLE IF EXISTS "ActivityLogs", "Contacts", "Favorites", "Flags", "Messages",
"Notifications", "Reviews", "SequelizeMeta", "Listings", "Users" CASCADE;

-- Users
CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "email" VARCHAR(255),
  "password" VARCHAR(255),
  "campus" VARCHAR(255),
  "bio" TEXT,
  "policy" TEXT,
  "phoneNumber" VARCHAR(255),
  "profileImage" VARCHAR(255),
  "rating" NUMERIC(10, 0),
  "activeListings" INTEGER,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "isVerified" BOOLEAN NOT NULL DEFAULT TRUE,
  "isAdmin" BOOLEAN NOT NULL DEFAULT FALSE
);

-- ActivityLogs
CREATE TABLE "ActivityLogs" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "action" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Contacts
CREATE TABLE "Contacts" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255),
  "email" VARCHAR(255),
  "subject" VARCHAR(255),
  "message" TEXT,
  "status" VARCHAR(255),
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" INTEGER REFERENCES "Users"("id") ON DELETE SET NULL
);

-- Favorites
CREATE TABLE "Favorites" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "favoriteUserId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Listings
CREATE TABLE "Listings" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255),
  "description" TEXT,
  "category" VARCHAR(255),
  "subcategory" VARCHAR(255),
  "price" NUMERIC(10, 0),
  "images" JSONB,
  "coverImage" VARCHAR(255),
  "userId" INTEGER REFERENCES "Users"("id") ON DELETE SET NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Flags
CREATE TABLE "Flags" (
  "id" SERIAL PRIMARY KEY,
  "reason" VARCHAR(255) NOT NULL,
  "comment" TEXT,
  "userId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "listingId" INTEGER NOT NULL REFERENCES "Listings"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Messages
CREATE TABLE "Messages" (
  "id" SERIAL PRIMARY KEY,
  "senderId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "receiverId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "messageText" TEXT,
  "imageUrl" VARCHAR(255),
  "read" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE "Notifications" (
  "id" SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "type" VARCHAR(255) NOT NULL,
  "message" VARCHAR(255) NOT NULL,
  "link" VARCHAR(255),
  "isRead" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE "Reviews" (
  "id" SERIAL PRIMARY KEY,
  "sellerId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "buyerId" INTEGER NOT NULL REFERENCES "Users"("id") ON DELETE CASCADE,
  "rating" INTEGER NOT NULL,
  "comment" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- SequelizeMeta (used for migrations)
CREATE TABLE "SequelizeMeta" (
  "name" VARCHAR(255) PRIMARY KEY
);