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

INSERT INTO `ActivityLogs` (`id`, `userId`, `action`, `description`, `createdAt`, `updatedAt`) VALUES
(1,	2,	'Update Listing',	'User 2 updated listing ID 16',	'2025-05-13 23:13:57',	'2025-05-13 23:13:57'),
(2,	1,	'Add Listing',	'User 1 added a new listing titled \"test\"',	'2025-05-14 00:53:31',	'2025-05-14 00:53:31'),
(3,	2,	'Update Listing',	'User Paulina James updated listing: test22',	'2025-05-14 02:09:10',	'2025-05-14 02:09:10');

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

INSERT INTO `Contacts` (`id`, `name`, `email`, `subject`, `message`, `status`, `createdAt`, `updatedAt`, `userId`) VALUES
(1,	'Genevieve',	'n01613636@humber.ca',	'issues with updating listing image',	'When i try to update a listing image or cover image i get errors and it doesnt work. kindly help to fix it.',	'pending',	'2025-05-13 22:23:59',	'2025-05-13 22:23:59',	NULL),
(2,	'Paulina',	'n01234567@humber.ca',	'flagging issue',	'I cant falg an issue, it doesnt work',	'pending',	'2025-05-13 22:28:11',	'2025-05-13 22:28:11',	NULL),
(3,	'Genevieve',	'n01613636@humber.ca',	'Issues with adding a listing',	'Issues with adding a new listing',	'resolved',	'2025-05-13 22:32:42',	'2025-05-13 22:44:42',	NULL),
(4,	'test',	'n01234567@humber.ca',	'test',	'test',	'resolved',	'2025-05-13 23:07:40',	'2025-05-13 23:07:55',	NULL);

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

INSERT INTO `Favorites` (`id`, `userId`, `favoriteUserId`, `createdAt`, `updatedAt`) VALUES
(4,	1,	2,	'2025-05-03 00:32:27',	'2025-05-03 00:32:27'),
(7,	2,	1,	'2025-05-03 02:27:15',	'2025-05-03 02:27:15'),
(10,	3,	1,	'2025-05-05 00:36:06',	'2025-05-05 00:36:06'),
(11,	3,	2,	'2025-05-05 16:09:48',	'2025-05-05 16:09:48'),
(12,	1,	3,	'2025-05-05 16:31:40',	'2025-05-05 16:31:40');

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

INSERT INTO `Flags` (`id`, `reason`, `comment`, `userId`, `listingId`, `createdAt`, `updatedAt`) VALUES
(2,	'Incorrect info',	'incorrect details',	1,	16,	'2025-05-13 21:59:18',	'2025-05-13 21:59:18'),
(3,	'Incorrect info',	'',	2,	17,	'2025-05-17 01:20:26',	'2025-05-17 01:20:26'),
(4,	'Spam',	'',	1,	9,	'2025-05-27 20:55:51',	'2025-05-27 20:55:51');

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

INSERT INTO `Listings` (`id`, `title`, `description`, `category`, `subcategory`, `price`, `images`, `coverImage`, `userId`, `createdAt`, `updatedAt`) VALUES
(1,	'Hair Braiding',	'Box and weave braiding',	'Service',	'Hair & Beauty',	80,	'\"[\\\"/uploads/listings/1739139094396-image-4.png\\\",\\\"/uploads/listings/1739139094397-image.png\\\"]\"',	'/uploads/listings/1739139094397-image.png',	1,	'2025-02-09 22:11:34',	'2025-03-02 21:47:11'),
(2,	'Frontal wigs',	'Curly short frontal wig',	'Product',	'Hair',	125,	'\"[\\\"/uploads/listings/1739145022285-image-3.png\\\",\\\"/uploads/listings/1739145022287-image-3.png\\\"]\"',	'/uploads/listings/1739145022285-image-3.png',	1,	'2025-02-09 23:50:22',	'2025-02-09 23:50:22'),
(6,	'Pixie Curl Wig',	'Pixie Curl',	'Product',	'Hair',	89,	'\"[\\\"/uploads/listings/1739306807104-pixie-curl.jpg\\\",\\\"/uploads/listings/1739306807107-pixie2.jpg\\\"]\"',	'/uploads/listings/1739306807104-pixie-curl.jpg',	1,	'2025-02-11 20:46:47',	'2025-03-04 02:43:44'),
(7,	'Bone Straight',	'Bone Straight wigs',	'Product',	'Hair',	125,	'\"[\\\"/uploads/listings/1739308483988-bone.jpeg\\\",\\\"/uploads/listings/1739308483988-bone2.jpeg\\\"]\"',	'/uploads/listings/1739308483988-bone.jpeg',	1,	'2025-02-11 21:14:43',	'2025-02-11 21:14:43'),
(8,	'Bouncy Wig',	'Bouncy Curl Wig',	'Product',	'Hair',	45,	'\"[\\\"/uploads/listings/1739310886352-bouncy.jpeg\\\"]\"',	'/uploads/listings/1739310886352-bouncy.jpeg',	1,	'2025-02-11 21:54:46',	'2025-03-04 02:40:01'),
(9,	'Bathing bar soap',	'Handmade toilet soap, scent-free',	'Product',	'Beauty & Personal Care',	15,	'\"[\\\"/uploads/listings/1741053077153-soap1.jpeg\\\",\\\"/uploads/listings/1741053077154-soap2.jpeg\\\",\\\"/uploads/listings/1741053077154-soap3.jpeg\\\"]\"',	'/uploads/listings/1741053077154-soap1.jpeg',	2,	'2025-03-04 01:51:17',	'2025-03-04 02:40:23'),
(10,	'Bracelet made',	'Hand made bracelet',	'Service',	'Jewelry',	20,	'\"[\\\"/uploads/listings/1741200937077-bracelet1.png\\\"]\"',	'/uploads/listings/1741200937079-bracelet1.png',	2,	'2025-03-05 18:55:37',	'2025-03-05 18:56:06'),
(12,	'Hair Care Product',	'Type 3c texture hair oil, butter and mist.',	'Product',	'Hair',	150,	'\"[\\\"/uploads/listings/1746393804287-hair1.jpeg\\\",\\\"/uploads/listings/1746393804288-hair2.jpeg\\\",\\\"/uploads/listings/1746393804288-hair3.jpeg\\\"]\"',	'/uploads/listings/1746393804288-hair2.jpeg',	2,	'2025-05-04 21:23:24',	'2025-05-04 21:23:24'),
(13,	'Peer Tutor',	'I tutor people on any mathematics subject.',	'Service',	'Tutoring',	15,	'\"[\\\"/uploads/listings/1746462637441-FREE-1-ON-1-MATH-TUTORING-1.png\\\",\\\"/uploads/listings/1746462637445-900z600_full_blg657c615038f643_07719149.jpeg\\\",\\\"/uploads/listings/1746462637445-peer tutoring.jpg\\\"]\"',	'/uploads/listings/1746462637446-peer tutoring.jpg',	3,	'2025-05-05 16:30:37',	'2025-05-05 16:31:06'),
(14,	'Math Books',	'I have math books for sale',	'Product',	'Books',	25,	'\"[\\\"/uploads/listings/1746492706551-9789673218141_b1.jpg\\\",\\\"/uploads/listings/1746492706554-mathematics-and-its-history.jpg\\\",\\\"/uploads/listings/1746492706554-ApplMath4thCover.jpg\\\"]\"',	'/uploads/listings/1746492706554-9789673218141_b1.jpg',	3,	'2025-05-06 00:51:46',	'2025-05-06 00:51:46'),
(16,	'test22',	'test',	'Product',	'Shoes',	20,	'\"[\\\"/uploads/listings/1747172764565-humber.png\\\"]\"',	'/uploads/listings/1747172764566-humber.png',	2,	'2025-05-13 21:46:04',	'2025-05-14 02:09:10'),
(17,	'test',	'test',	'Product',	'Hair',	7,	'\"[\\\"/uploads/listings/1747184011268-humber.png\\\"]\"',	'/uploads/listings/1747184011270-humber.png',	1,	'2025-05-14 00:53:31',	'2025-05-14 00:53:31');

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

INSERT INTO `Messages` (`id`, `senderId`, `receiverId`, `messageText`, `imageUrl`, `read`, `createdAt`, `updatedAt`) VALUES
(1,	1,	2,	'Hi Paulina',	NULL,	1,	'2025-05-06 00:43:00',	'2025-05-08 01:03:20'),
(2,	1,	2,	'Hi',	NULL,	1,	'2025-05-06 01:24:41',	'2025-05-08 01:03:20'),
(3,	1,	2,	'Hi',	NULL,	1,	'2025-05-06 01:39:41',	'2025-05-08 01:03:20'),
(4,	1,	2,	'Hi',	NULL,	1,	'2025-05-06 02:13:17',	'2025-05-08 01:03:20'),
(5,	2,	1,	'Hey Genevieve',	NULL,	1,	'2025-05-06 02:40:02',	'2025-05-08 01:02:58'),
(6,	1,	2,	'hi',	NULL,	1,	'2025-05-06 03:23:07',	'2025-05-08 01:03:20'),
(7,	1,	2,	'I want 5 of this soap',	'messages/1746501881577.jpeg',	1,	'2025-05-06 03:24:41',	'2025-05-08 01:03:20'),
(8,	1,	2,	'Seen',	NULL,	1,	'2025-05-06 03:35:43',	'2025-05-08 01:03:20'),
(9,	1,	2,	'',	'messages/1746502692489.jpeg',	1,	'2025-05-06 03:38:12',	'2025-05-08 01:03:20'),
(10,	1,	2,	'',	'messages/1746502854860.jpeg',	1,	'2025-05-06 03:40:54',	'2025-05-08 01:03:20'),
(11,	1,	2,	'Hi',	NULL,	1,	'2025-05-07 23:07:30',	'2025-05-08 01:03:20'),
(12,	1,	2,	'Hi',	NULL,	1,	'2025-05-07 23:13:33',	'2025-05-08 01:03:20'),
(13,	2,	1,	'Hi',	NULL,	1,	'2025-05-08 00:05:45',	'2025-05-08 01:02:58'),
(14,	3,	1,	'Hi',	NULL,	1,	'2025-05-08 00:16:25',	'2025-05-08 01:02:57'),
(15,	2,	3,	'Hi',	NULL,	1,	'2025-05-08 00:25:28',	'2025-05-08 01:03:10'),
(16,	1,	3,	'hi',	NULL,	1,	'2025-05-08 00:33:16',	'2025-05-08 01:03:07'),
(17,	1,	3,	'hi',	NULL,	1,	'2025-05-08 00:34:02',	'2025-05-08 01:03:07'),
(18,	1,	2,	'hi',	NULL,	1,	'2025-05-08 00:34:32',	'2025-05-08 01:03:20'),
(19,	2,	3,	'hi',	NULL,	1,	'2025-05-08 00:34:38',	'2025-05-08 01:03:10'),
(20,	2,	3,	'hi',	NULL,	1,	'2025-05-08 00:34:54',	'2025-05-08 01:03:10'),
(21,	1,	3,	'Hey',	NULL,	1,	'2025-05-08 01:27:59',	'2025-05-08 01:28:23'),
(22,	2,	3,	'Hey',	NULL,	1,	'2025-05-08 01:29:21',	'2025-05-08 01:29:36'),
(23,	2,	3,	'Hey',	NULL,	1,	'2025-05-08 01:30:02',	'2025-05-08 02:28:31'),
(24,	1,	3,	'Thanks',	NULL,	1,	'2025-05-08 01:44:43',	'2025-05-08 01:44:44'),
(25,	1,	2,	'you see this',	NULL,	1,	'2025-05-08 02:11:11',	'2025-05-08 02:11:21'),
(26,	2,	1,	'yes',	NULL,	1,	'2025-05-08 02:11:45',	'2025-05-08 02:11:45'),
(27,	1,	2,	'ok',	NULL,	1,	'2025-05-08 02:12:16',	'2025-05-08 02:12:16'),
(28,	1,	2,	'hi',	NULL,	1,	'2025-05-08 02:27:39',	'2025-05-08 02:27:46'),
(29,	2,	3,	'Hi',	NULL,	1,	'2025-05-08 02:28:59',	'2025-05-08 02:29:00'),
(30,	3,	2,	'Hey',	NULL,	1,	'2025-05-08 02:29:14',	'2025-05-08 02:29:14'),
(31,	1,	2,	'this is to test a long message and see how it appears',	NULL,	1,	'2025-05-08 02:50:11',	'2025-05-08 02:53:21'),
(32,	1,	3,	'available',	'messages/1746675054716.jpeg',	1,	'2025-05-08 03:30:54',	'2025-05-08 03:56:05'),
(33,	1,	2,	'',	'messages/1746675327378.jpeg',	1,	'2025-05-08 03:35:27',	'2025-05-08 03:36:21'),
(34,	1,	2,	'test',	'messages/1746675640661.jpeg',	1,	'2025-05-08 03:40:40',	'2025-05-08 03:40:40'),
(35,	1,	2,	'test',	'messages/1746675762000.jpeg',	1,	'2025-05-08 03:42:42',	'2025-05-08 03:43:21'),
(36,	1,	2,	'test',	'1746676014149.jpeg',	1,	'2025-05-08 03:46:54',	'2025-05-08 03:47:21'),
(37,	2,	1,	'Works',	NULL,	1,	'2025-05-08 03:57:30',	'2025-05-08 03:57:30'),
(38,	1,	3,	'Testing',	'1746677026953.jpeg',	1,	'2025-05-08 04:03:46',	'2025-05-08 04:03:49'),
(39,	1,	3,	'hey, online?',	NULL,	1,	'2025-05-08 04:12:48',	'2025-05-13 01:17:49'),
(40,	3,	2,	'Hey',	NULL,	0,	'2025-05-10 20:09:53',	'2025-05-10 20:09:53'),
(41,	1,	3,	'hey',	NULL,	1,	'2025-05-27 20:58:14',	'2025-05-27 20:59:42'),
(42,	1,	3,	'wanna buy soap',	NULL,	1,	'2025-05-27 20:58:22',	'2025-05-27 20:59:42');

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

INSERT INTO `Notifications` (`id`, `userId`, `type`, `message`, `link`, `isRead`, `createdAt`, `updatedAt`) VALUES
(1,	1,	'favorite',	'User Paulina James favorited your profile.',	'/seller/2',	1,	'2025-05-03 02:27:15',	'2025-05-13 22:35:28'),
(2,	1,	'review',	'User Paulina James left a review on your profile.',	'/seller/1',	0,	'2025-05-03 04:11:28',	'2025-05-03 04:11:28'),
(3,	1,	'favorite',	'Gabi favorited your profile.',	'/seller/3',	0,	'2025-05-04 23:42:33',	'2025-05-04 23:42:33'),
(4,	1,	'favorite',	'Gabi favorited your profile.',	'/seller/3',	1,	'2025-05-04 23:43:09',	'2025-05-05 01:19:06'),
(5,	1,	'review',	'User Gabi left a review on your profile.',	'/seller/1',	1,	'2025-05-04 23:49:26',	'2025-05-05 01:22:57'),
(6,	1,	'favorite',	'Gabi favorited your profile.',	'/seller/3',	1,	'2025-05-05 00:36:06',	'2025-05-05 01:14:38'),
(7,	2,	'favorite',	'Gabi favorited your profile.',	'/seller/3',	0,	'2025-05-05 16:09:48',	'2025-05-05 16:09:48'),
(8,	2,	'review',	'Gabi left a review on your profile.',	'/seller/2',	0,	'2025-05-05 16:14:19',	'2025-05-05 16:14:19'),
(9,	3,	'favorite',	'Genevieve favorited your profile.',	'/seller/1',	1,	'2025-05-05 16:31:40',	'2025-05-06 03:34:55'),
(10,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 01:24:41',	'2025-05-06 01:24:56'),
(11,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 01:39:41',	'2025-05-06 01:40:23'),
(12,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 02:13:17',	'2025-05-06 02:14:04'),
(13,	1,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-06 02:40:02',	'2025-05-06 02:40:15'),
(14,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 03:23:08',	'2025-05-08 02:28:10'),
(15,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 03:24:41',	'2025-05-06 03:36:08'),
(16,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 03:35:43',	'2025-05-06 03:36:03'),
(17,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 03:38:12',	'2025-05-08 02:28:07'),
(18,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-06 03:40:54',	'2025-05-08 02:28:06'),
(19,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-07 23:07:30',	'2025-05-07 23:07:45'),
(20,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-07 23:13:33',	'2025-05-07 23:14:07'),
(21,	1,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-08 00:05:45',	'2025-05-08 00:15:15'),
(22,	1,	'message',	'You have a new message from Gabi',	'/messages/3',	1,	'2025-05-08 00:16:25',	'2025-05-08 01:06:33'),
(23,	3,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-08 00:25:28',	'2025-05-08 02:28:38'),
(24,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 00:33:16',	'2025-05-08 00:33:52'),
(25,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 00:34:02',	'2025-05-08 02:28:36'),
(26,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 00:34:32',	'2025-05-08 02:28:04'),
(27,	3,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-08 00:34:38',	'2025-05-08 01:29:10'),
(28,	3,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-08 00:34:54',	'2025-05-08 01:28:36'),
(29,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 01:27:59',	'2025-05-08 01:28:31'),
(30,	3,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-08 01:29:21',	'2025-05-08 02:28:33'),
(31,	3,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-08 01:30:02',	'2025-05-08 02:28:31'),
(32,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 01:44:43',	'2025-05-08 02:28:30'),
(33,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 02:11:11',	'2025-05-08 02:28:03'),
(34,	1,	'message',	'You have a new message from Paulina James',	'/messages/2',	1,	'2025-05-08 02:11:45',	'2025-05-08 02:28:18'),
(35,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 02:12:16',	'2025-05-08 02:28:01'),
(36,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-08 02:27:39',	'2025-05-08 02:27:59'),
(37,	3,	'message',	'You have a new message from Paulina James',	'/messages/2',	0,	'2025-05-08 02:28:59',	'2025-05-08 02:28:59'),
(38,	2,	'message',	'You have a new message from Gabi',	'/messages/3',	0,	'2025-05-08 02:29:14',	'2025-05-08 02:29:14'),
(39,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 02:50:11',	'2025-05-08 02:50:11'),
(40,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 03:30:54',	'2025-05-08 03:30:54'),
(41,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 03:35:27',	'2025-05-08 03:35:27'),
(42,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 03:40:40',	'2025-05-08 03:40:40'),
(43,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 03:42:42',	'2025-05-08 03:42:42'),
(44,	2,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 03:46:54',	'2025-05-08 03:46:54'),
(45,	1,	'message',	'You have a new message from Paulina James',	'/messages/2',	0,	'2025-05-08 03:57:30',	'2025-05-08 03:57:30'),
(46,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 04:03:46',	'2025-05-08 04:03:46'),
(47,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-08 04:12:48',	'2025-05-08 04:12:48'),
(48,	2,	'message',	'You have a new message from Gabi',	'/messages/3',	0,	'2025-05-10 20:09:53',	'2025-05-10 20:09:53'),
(49,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	0,	'2025-05-27 20:58:14',	'2025-05-27 20:58:14'),
(50,	3,	'message',	'You have a new message from Genevieve',	'/messages/1',	1,	'2025-05-27 20:58:22',	'2025-05-27 20:59:42');

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

INSERT INTO `Reviews` (`id`, `sellerId`, `buyerId`, `rating`, `comment`, `createdAt`, `updatedAt`) VALUES
(1,	2,	1,	4,	'I love the soap; it\'s scent-free and good for dry skin.',	'2025-03-05 20:27:24',	'2025-03-05 20:27:24'),
(2,	2,	1,	4,	'I love the bracelet',	'2025-03-05 20:50:12',	'2025-03-05 20:50:12'),
(3,	2,	1,	5,	'Great customer service and quick delievry',	'2025-03-05 20:50:42',	'2025-03-05 20:50:42'),
(4,	2,	1,	4,	'The soaps are good for any skin type.',	'2025-03-05 20:51:14',	'2025-03-05 20:51:14'),
(5,	1,	2,	5,	'Awesome Service',	'2025-05-03 03:08:49',	'2025-05-03 03:08:49'),
(6,	1,	2,	4,	'Product is awesome thanks',	'2025-05-03 04:11:28',	'2025-05-03 04:11:28'),
(7,	1,	3,	5,	'I love your hair, very affordable and original',	'2025-05-04 23:49:26',	'2025-05-04 23:49:26'),
(8,	2,	3,	4,	'I love the soap, it is scent-free',	'2025-05-05 16:14:19',	'2025-05-05 16:14:19');

DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `SequelizeMeta` (`name`) VALUES
('20250209220708-create-user.js'),
('20250209220744-create-listing.js'),
('20250303013056-add_isVerified_to_users.js'),
('20250303022809-create-reviews.js'),
('20250502225113-create-favorites.js'),
('20250503010646-create-notifications.js'),
('20250505174613-create-messages.js'),
('20250509030033-create-flag.js'),
('20250510213732-add-isAdmin-to-users.js'),
('20250513031305-create-contact.js'),
('20250513032251-add-userId-to-contacts.js'),
('20250513033019-add-default-isVerified.js'),
('20250513231230-create-activitylog.js');

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

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `campus`, `bio`, `policy`, `phoneNumber`, `profileImage`, `rating`, `activeListings`, `createdAt`, `updatedAt`, `isVerified`, `isAdmin`) VALUES
(1,	'Genevieve',	'n01613636@humber.ca',	'$2a$10$/tg6rcUpZp/a00hO3aUcf.n2WZp5CJjGgaovtlRiZ1QhRsUhYzQiC',	'North',	'I sell and make hair',	'No refunds',	NULL,	'http://localhost:5500/uploads/profile/1739139018514-Barbie.JPG',	5,	0,	'2025-02-09 22:09:47',	'2025-05-04 23:49:26',	1,	0),
(2,	'Paulina James',	'n01234567@humber.ca',	'$2a$10$WQNvZ5uOztjaFlUV9tini.nTxwNOWEjn/6tpWGvR7l/GmKdTSTXR6',	'IGS',	NULL,	NULL,	NULL,	'http://localhost:5500/uploads/profile/1741052777687-james-ss.jpeg',	4,	0,	'2025-03-04 00:46:44',	'2025-05-05 16:14:19',	1,	0),
(3,	'Gabi',	'n09876543@humber.ca',	'$2a$10$d1PfoJive/8I6DV4uEGSyOFtKUrGkEccqvRpl1OMgKxaV6730nHwO',	'North',	NULL,	NULL,	NULL,	NULL,	0,	0,	'2025-05-04 22:52:57',	'2025-05-04 23:10:59',	1,	1);

-- 2025-06-09 16:56:47