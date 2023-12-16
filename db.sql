-- Adminer 4.8.1 MySQL 8.0.34 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_9474526CA76ED395` (`user_id`),
  KEY `IDX_9474526C4B89032C` (`post_id`),
  CONSTRAINT `FK_9474526C4B89032C` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  CONSTRAINT `FK_9474526CA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `comment` (`id`, `user_id`, `post_id`, `content`, `created_at`, `updated_at`) VALUES
(52,	39,	68,	'Voyager élargit nos horizons, nous permettant de mieux comprendre le monde et de devenir des personnes plus ouvertes d\'esprit.',	'2023-10-10 22:02:34',	NULL),
(53,	40,	69,	'Un sourire sincère peut créer des liens et apporter de la positivité. Il suffit parfois de peu pour faire la différence dans la vie de quelqu\'un.',	'2023-10-10 22:02:34',	NULL),
(54,	42,	70,	'L\'imagination est une force puissante. Lorsque vous la laissez s\'exprimer, vous pouvez accomplir des choses incroyables.',	'2023-10-10 22:02:35',	NULL),
(55,	43,	71,	'Le café du matin peut être une source de réconfort, vous donnant l\'énergie nécessaire pour bien commencer la journée.',	'2023-10-10 22:02:35',	NULL),
(58,	38,	74,	'La persévérance est essentielle pour atteindre ses objectifs. Les défis font partie du chemin vers la réussite.',	'2023-10-10 22:02:36',	NULL),
(62,	36,	71,	'C\'est fort inspirant ',	'2023-10-11 10:50:37',	NULL),
(63,	46,	74,	'Brillant',	'2023-10-11 13:22:26',	NULL),
(67,	36,	68,	'Merci',	'2023-10-25 13:38:58',	NULL);

DROP TABLE IF EXISTS `doctrine_migration_versions`;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20231003090753',	'2023-10-03 11:08:28',	770);

DROP TABLE IF EXISTS `friendship`;
CREATE TABLE `friendship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_7234A45FF624B39D` (`sender_id`),
  KEY `IDX_7234A45FCD53EDB6` (`receiver_id`),
  CONSTRAINT `FK_7234A45FCD53EDB6` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_7234A45FF624B39D` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_BF5476CAA76ED395` (`user_id`),
  CONSTRAINT `FK_BF5476CAA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `author_id` int NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_5A8A6C8DF675F31B` (`author_id`),
  CONSTRAINT `FK_5A8A6C8DF675F31B` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `post` (`id`, `author_id`, `content`, `created_at`, `updated_at`, `picture`) VALUES
(68,	43,	'Les voyages forment la jeunesse. Explorez le monde, découvrez de nouvelles cultures, et grandissez en expérience.',	'2023-10-10 22:02:34',	NULL,	NULL),
(69,	39,	'Le sourire est le miroir de l\'âme. Offrez un sourire à quelqu\'un aujourd\'hui, cela pourrait illuminer sa journée.',	'2023-10-10 22:02:34',	NULL,	NULL),
(70,	41,	'La créativité n\'a pas de limites. Laissez votre imagination s\'envoler et créez quelque chose d\'extraordinaire.',	'2023-10-10 22:02:35',	NULL,	NULL),
(71,	42,	'Le café du matin est un rituel sacré pour de nombreuses personnes. Rien de tel qu\'une tasse de café fraîchement préparée.',	'2023-10-10 22:02:35',	NULL,	NULL),
(74,	45,	'La persévérance est la clé du succès. Ne jamais abandonner, même face aux obstacles les plus difficiles.',	'2023-10-10 22:02:36',	NULL,	NULL),
(75,	36,	'Merveilleux vent de grâce qui amoureusement caresse mon visage soucieux !',	'2023-10-11 11:04:15',	NULL,	NULL),
(76,	46,	'Bonjour liberté',	'2023-10-11 13:21:58',	NULL,	NULL);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `profile_picture` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `roles` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `user` (`id`, `username`, `first_name`, `last_name`, `email`, `password`, `date_of_birth`, `profile_picture`, `created_at`, `updated_at`, `roles`) VALUES
(36,	'Admin',	'Antoine',	'Dupont',	'email0@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$Tjltc3BaRzNJUEdmZzZQLg$L1ZOWAiWjpayA+XgZpixUKvcfmaT0wKlYeqHhse4dWk',	'2023-10-10',	NULL,	'2023-10-10 22:02:33',	NULL,	'[\"ROLE_ADMIN\"]'),
(38,	'Pierre Dubois',	'Pierre ',	'Dubois',	'email2@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$Ni92S0hOdlVvVmk0b2JUVA$mYmLMu3klKPSPSRDFVGYJkAdjp3+60//xoqauHgmh80',	'2023-10-10',	NULL,	'2023-10-10 22:02:34',	NULL,	'[\"ROLE_USER\"]'),
(39,	'Camille Lefebvre',	'Camille ',	'Lefebvre',	'email3@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$UC5jeVkxeXNsQWVzYlduUQ$7QqdaF7Igad1/10Yh24h74EcC+n6g8i+CHvVCNclEZU',	'2023-10-10',	NULL,	'2023-10-10 22:02:34',	NULL,	'[\"ROLE_USER\"]'),
(40,	'Jean Dujardin',	'Jean',	'Dujardin',	'email4@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$MFFKZlouQ051TmxnUTR3UQ$+9nedGKOWEUgrrn4KdWcs0BAx/EZz45EaD/GBR69vfA',	'2023-10-10',	NULL,	'2023-10-10 22:02:34',	NULL,	'[\"ROLE_USER\"]'),
(41,	'Jacques Chiralc',	'Jacques',	'Chiralc',	'email5@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$dHB1Ny9FV0JZWnhpUURNOA$Bz2++FM12vk2woXmxqljiwoYRF14WP6R84zYptoagLA',	'2023-10-10',	NULL,	'2023-10-10 22:02:35',	NULL,	'[\"ROLE_USER\"]'),
(42,	'Simone Weil',	'Simone',	'Weil',	'email6@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$TEE0OVVCdm5XL05YbGRHWg$n6EN+UlPbOq8W0+M5651MPTn1jnnBBbwJ19RXtBw5VE',	'2023-10-10',	NULL,	'2023-10-10 22:02:35',	NULL,	'[\"ROLE_USER\"]'),
(43,	'Jean-Jacques Rousseau',	'Jean-Jacques',	'Rousseau',	'email7@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$VHRhZzFlNFF1NEUyRkFZMQ$r1quZkCQF+X/j4SST92ITUTz0ncJU1WAeSLVg0KmIPM',	'2023-10-10',	NULL,	'2023-10-10 22:02:35',	NULL,	'[\"ROLE_USER\"]'),
(45,	'Kentaro Miura',	'Kentaro',	'Miura',	'email9@gmail.com',	'$argon2id$v=19$m=65536,t=4,p=1$ZVpvZlU4TGsyMnk0T09JeQ$gOjBwZ/XRJxhimMvYjdRFtctrN0RinUr+NFXJUx6wCY',	'2023-10-10',	NULL,	'2023-10-10 22:02:36',	NULL,	'[\"ROLE_USER\"]'),
(46,	'Seneque',	'Seneque',	'Le Philosphe',	'Seneque@seneque.com',	'$argon2id$v=19$m=65536,t=4,p=1$WHZOWXdZMWsvdXFWalhCeA$6dEuydkXMk7BBHXy6X8TqXQLlqmWSxvNJ+746Grxs/s',	'2023-05-02',	NULL,	'2023-10-11 13:19:37',	NULL,	'[\"ROLE_USER\"]'),
(51,	'Lorenzo',	'lorenzo',	'lorenzo',	'Lorenzo@lorenzo.fr',	'$argon2id$v=19$m=65536,t=4,p=1$NnRyOWMwZ0pSNW5mLk1uQQ$nWVDoFSegFzRmYxq7sKaj/2Dgo8qtYetAiTuI6JG1wk',	'2023-10-11',	NULL,	'2023-10-14 21:47:44',	NULL,	'[\"ROLE_USER\"]'),
(52,	'Raphael',	'Rapheal',	'Raphal',	'Raphael@raphae',	'$argon2id$v=19$m=65536,t=4,p=1$Uk9BRVNMbTVYa1VkcXBSZg$jMQcmxMTWKfP8FREn3D7ck/sfZEUCPEsh3nBgYzW+pk',	'2023-10-12',	NULL,	'2023-10-14 22:02:53',	NULL,	'[\"ROLE_USER\"]');

-- 2023-12-16 09:58:16
