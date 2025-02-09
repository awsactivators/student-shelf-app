-- Adminer 4.8.1 MySQL 10.4.28-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

USE `student_shelf_app`;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `Listings`;
CREATE TABLE `Listings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `subcategory` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`images`)),
  `coverImage` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `campus` varchar(255) NOT NULL,
  `bio` text DEFAULT NULL,
  `policy` text DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT 0.0,
  `activeListings` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `campus`, `bio`, `policy`, `phoneNumber`, `profileImage`, `rating`, `activeListings`, `createdAt`, `updatedAt`) VALUES
(1,	'John Doe',	'n01234567@humber.ca',	'$2a$10$JTyH2PpRRm28WQk5BqrmOO49MrShynxAi5jhkyusIV9gtHMe.mFta',	'North',	NULL,	NULL,	NULL,	NULL,	0.0,	0,	'2025-02-08 21:00:02',	'2025-02-08 21:00:02'),
(2,	'Genevieve Awa',	'n01613636@humber.ca',	'$2a$10$f57CDEL3IIcPDO3g/pskTO.tHZHvyPrz3LVJUeSi.zFQAVyQnNzWC',	'North',	NULL,	NULL,	NULL,	'http://localhost:5500/uploads/profile/2-1739089123240.JPG',	0.0,	0,	'2025-02-08 23:09:44',	'2025-02-09 08:18:43');

-- 2025-02-09 21:49:00
