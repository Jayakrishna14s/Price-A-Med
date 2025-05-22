-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: evernorth
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressid` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `house_no` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`addressid`),
  UNIQUE KEY `UKc29k1p0rbffh2cr8oa8wtx72o` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Hyderabad','India','16-1-337','SRR THOTA','501218','Telangana',2);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allergies`
--

DROP TABLE IF EXISTS `allergies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergies` (
  `currentallergyid` int NOT NULL AUTO_INCREMENT,
  `allergyid` int NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`currentallergyid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies`
--

LOCK TABLES `allergies` WRITE;
/*!40000 ALTER TABLE `allergies` DISABLE KEYS */;
INSERT INTO `allergies` VALUES (4,2,2),(5,3,2);
/*!40000 ALTER TABLE `allergies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `allergies_list`
--

DROP TABLE IF EXISTS `allergies_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `allergies_list` (
  `allergyID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`allergyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `allergies_list`
--

LOCK TABLES `allergies_list` WRITE;
/*!40000 ALTER TABLE `allergies_list` DISABLE KEYS */;
INSERT INTO `allergies_list` VALUES (1,'Anesthesia (Lidocaine)'),(2,'Aspirin & NSAIDs (Ibuprofen, Naproxen)'),(3,'Chemotherapy Drugs'),(4,'Chlorine (Swimming Pools)'),(5,'Cockroach Droppings'),(6,'Contrast Dye (Used in CT scans & MRIs)'),(7,'Dust Mites'),(8,'Formaldehyde (Cosmetics, Cleaning Products)'),(9,'Fragrances & Perfumes'),(10,'Fungal Spores'),(11,'Hair Dyes (PPD - Paraphenylenediamine)'),(12,'Insulin (Animal-derived)'),(13,'Insect Stings (Bees, Wasps, Ants)'),(14,'Latex (Gloves, Balloons, Medical Equipment)'),(15,'Mold Spores'),(16,'Nickel (Jewelry, Coins, Eyewear)'),(17,'Opioids (Morphine, Codeine)'),(18,'Parabens & Preservatives (Shampoos, Lotions)'),(19,'Penicillin and Other Antibiotics'),(20,'Pet Dander (Cats, Dogs, Horses, etc.)'),(21,'Pollen (Tree, Grass, Weed)'),(22,'Rubber & Adhesives'),(23,'Sulfa Drugs'),(24,'Sunscreens (Oxybenzone)'),(25,'Certain Soaps & Detergents'),(26,'Synthetic Fabrics & Wool');
/*!40000 ALTER TABLE `allergies_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alternative_medication`
--

DROP TABLE IF EXISTS `alternative_medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alternative_medication` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `alt_med_id` bigint NOT NULL,
  `med_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6h9frbpfvcdrf274f8v4ni0g6` (`alt_med_id`),
  KEY `FKg8xskb1c2rr6f2wpyb3278sud` (`med_id`),
  CONSTRAINT `FK6h9frbpfvcdrf274f8v4ni0g6` FOREIGN KEY (`alt_med_id`) REFERENCES `medication` (`id`),
  CONSTRAINT `FKg8xskb1c2rr6f2wpyb3278sud` FOREIGN KEY (`med_id`) REFERENCES `medication` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternative_medication`
--

LOCK TABLES `alternative_medication` WRITE;
/*!40000 ALTER TABLE `alternative_medication` DISABLE KEYS */;
INSERT INTO `alternative_medication` VALUES (1,7,1),(2,8,2),(3,9,5),(4,10,7),(5,11,9),(6,12,11),(7,9,3),(8,10,4),(9,12,6);
/*!40000 ALTER TABLE `alternative_medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `unit_price` decimal(38,2) NOT NULL,
  `item_id` bigint NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3nanx9dj4rn6puuymrejcky2w` (`item_id`),
  KEY `FKjnaj4sjyqjkr4ivemf9gb25w` (`user_id`),
  CONSTRAINT `FK3nanx9dj4rn6puuymrejcky2w` FOREIGN KEY (`item_id`) REFERENCES `pharm_med_info` (`id`),
  CONSTRAINT `FKjnaj4sjyqjkr4ivemf9gb25w` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_item`
--

LOCK TABLES `cart_item` WRITE;
/*!40000 ALTER TABLE `cart_item` DISABLE KEYS */;
INSERT INTO `cart_item` VALUES (26,5,18.99,1,3);
/*!40000 ALTER TABLE `cart_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_medications`
--

DROP TABLE IF EXISTS `current_medications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_medications` (
  `currentmedicationid` int NOT NULL AUTO_INCREMENT,
  `medicationid` int NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`currentmedicationid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_medications`
--

LOCK TABLES `current_medications` WRITE;
/*!40000 ALTER TABLE `current_medications` DISABLE KEYS */;
INSERT INTO `current_medications` VALUES (7,1,2),(8,2,2),(9,5,2);
/*!40000 ALTER TABLE `current_medications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_address`
--

DROP TABLE IF EXISTS `delivery_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_address` (
  `addressid` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `house_no` varchar(255) DEFAULT NULL,
  `landmark` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`addressid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_address`
--

LOCK TABLES `delivery_address` WRITE;
/*!40000 ALTER TABLE `delivery_address` DISABLE KEYS */;
INSERT INTO `delivery_address` VALUES (1,'Hyderabad','India','16-1-337','SRR THOTA','501218','Telangana',2),(2,'lahg;','kjsgf','16-2-334','dfdfdf','763542','kajhf',2),(3,'sdge','sgdfh','16-1-337','edtfsg','783644','sgdgg',2),(4,'Hyderabad','India','16-1-337','SRR THOTA','501218','Telangana',1);
/*!40000 ALTER TABLE `delivery_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependent`
--

DROP TABLE IF EXISTS `dependent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent` (
  `dependentid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'https://res.cloudinary.com/dkezdazmt/image/upload/v1735478208/Evernorth/evernorth_logo.png',
  `userid` int NOT NULL,
  PRIMARY KEY (`dependentid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent`
--

LOCK TABLES `dependent` WRITE;
/*!40000 ALTER TABLE `dependent` DISABLE KEYS */;
INSERT INTO `dependent` VALUES ('dpt$7fJTrMKI','jayakrishna_14','https://res.cloudinary.com/dkezdazmt/image/upload/v1743681562/y2gjptvcnu2ag6fx81bx.jpg',2),('dpt$oC176b6f','Magic','https://res.cloudinary.com/dkezdazmt/image/upload/v1743730089/mba0ga59cdqij91kaykw.png',2),('dpt$Pdv9Rpgz','AirflowX','https://res.cloudinary.com/dkezdazmt/image/upload/v1743735885/ipi83p6yqbvb8aod05dv.jpg',2);
/*!40000 ALTER TABLE `dependent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependent_allergy`
--

DROP TABLE IF EXISTS `dependent_allergy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent_allergy` (
  `dependent_allergy_id` int NOT NULL AUTO_INCREMENT,
  `allergyid` int NOT NULL,
  `dependentid` varchar(255) NOT NULL,
  PRIMARY KEY (`dependent_allergy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent_allergy`
--

LOCK TABLES `dependent_allergy` WRITE;
/*!40000 ALTER TABLE `dependent_allergy` DISABLE KEYS */;
INSERT INTO `dependent_allergy` VALUES (1,1,'dpt$T3toxavf'),(3,6,'dpt$oC176b6f'),(4,1,'dpt$7fJTrMKI'),(5,6,'dpt$7fJTrMKI'),(6,2,'dpt$Pdv9Rpgz');
/*!40000 ALTER TABLE `dependent_allergy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependent_health_condition`
--

DROP TABLE IF EXISTS `dependent_health_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent_health_condition` (
  `dependent_condition_id` int NOT NULL AUTO_INCREMENT,
  `conditionid` int NOT NULL,
  `dependentid` varchar(255) NOT NULL,
  PRIMARY KEY (`dependent_condition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent_health_condition`
--

LOCK TABLES `dependent_health_condition` WRITE;
/*!40000 ALTER TABLE `dependent_health_condition` DISABLE KEYS */;
INSERT INTO `dependent_health_condition` VALUES (1,2,'dpt$T3toxavf'),(3,2,'dpt$oC176b6f'),(4,2,'dpt$7fJTrMKI'),(5,2,'dpt$Pdv9Rpgz');
/*!40000 ALTER TABLE `dependent_health_condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dependent_medication`
--

DROP TABLE IF EXISTS `dependent_medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dependent_medication` (
  `dependent_medication_id` int NOT NULL AUTO_INCREMENT,
  `dependentid` varchar(255) NOT NULL,
  `medicationid` int NOT NULL,
  PRIMARY KEY (`dependent_medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dependent_medication`
--

LOCK TABLES `dependent_medication` WRITE;
/*!40000 ALTER TABLE `dependent_medication` DISABLE KEYS */;
INSERT INTO `dependent_medication` VALUES (1,'dpt$T3toxavf',3),(3,'dpt$oC176b6f',2),(4,'dpt$7fJTrMKI',3),(5,'dpt$Pdv9Rpgz',5);
/*!40000 ALTER TABLE `dependent_medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health_conditions`
--

DROP TABLE IF EXISTS `health_conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health_conditions` (
  `healthconditionid` int NOT NULL AUTO_INCREMENT,
  `conditionid` int NOT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`healthconditionid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health_conditions`
--

LOCK TABLES `health_conditions` WRITE;
/*!40000 ALTER TABLE `health_conditions` DISABLE KEYS */;
INSERT INTO `health_conditions` VALUES (1,1,2),(2,2,2),(3,3,2);
/*!40000 ALTER TABLE `health_conditions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `health_conditions_list`
--

DROP TABLE IF EXISTS `health_conditions_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `health_conditions_list` (
  `conditionID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`conditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `health_conditions_list`
--

LOCK TABLES `health_conditions_list` WRITE;
/*!40000 ALTER TABLE `health_conditions_list` DISABLE KEYS */;
INSERT INTO `health_conditions_list` VALUES (1,'Diabetes'),(2,'Hypertension'),(3,'Asthma'),(4,'Arthritis');
/*!40000 ALTER TABLE `health_conditions_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance_plan`
--

DROP TABLE IF EXISTS `insurance_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance_plan` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `discount` double NOT NULL,
  `plan_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance_plan`
--

LOCK TABLES `insurance_plan` WRITE;
/*!40000 ALTER TABLE `insurance_plan` DISABLE KEYS */;
INSERT INTO `insurance_plan` VALUES (1,5,'plan1'),(2,10,'plan2'),(3,15,'plan3');
/*!40000 ALTER TABLE `insurance_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` text,
  `dosage_type` varchar(255) DEFAULT NULL,
  `med_image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `strength` varchar(255) DEFAULT NULL,
  `type` enum('BRANDED','GENERIC') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES (1,'Pain reliever','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743502302/advil-tablets-200-mg_zo7wqb.jpg','Advil','200mg','BRANDED'),(2,'Pain reliever','Tablet',' https://res.cloudinary.com/dkezdazmt/image/upload/v1743502819/motrin-tablets-EN_jhxnfz.png','Motrin','400mg','BRANDED'),(3,'Antibiotic','Capsule','https://res.cloudinary.com/dkezdazmt/image/upload/v1743502919/amoxicillin-tablets-1000mg_pdq0rh.jpg','Amoxil','500mg','BRANDED'),(4,'Antihistamine','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503104/claritin_k1vojm.jpg','Claritin','10mg','BRANDED'),(5,'Cholesterol Lowering','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503209/5eefa60b-6e0e-4624-a3a3-40196e90b6f3_s9vksw.jpg','Lipitor','20mg','BRANDED'),(6,'Blood Pressure','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503303/lisinopril-tablets_curot0.jpg','Zestril','10mg','BRANDED'),(7,'Pain reliever','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503420/ibuprofen-tablets-b-p-200-mg_nmk1ac.jpg','Ibuprofen Generic 200mg','200mg','GENERIC'),(8,'Pain reliever','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503462/untitled-2_duqxg4.jpg','Ibuprofen Generic 400mg','400mg','GENERIC'),(9,'Antibiotic','Capsule','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503604/110804-1_ch0zoi.jpg','Amoxicillin Generic 500mg','500mg','GENERIC'),(10,'Antihistamine','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503769/loratadine-10-mg-tablets_q80avb.jpg','Loratadine Generic 10mg','10mg','GENERIC'),(11,'Cholesterol Lowering','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503822/atorvastatin-20-mg-tablets_sjlqzo.jpg','Atorvastatin Generic 20mg','20mg','GENERIC'),(12,'Blood Pressure','Tablet','https://res.cloudinary.com/dkezdazmt/image/upload/v1743503892/lisinopril-10-mg-tab_h22gin.jpg','Lisinopril Generic 10mg','10mg','GENERIC');
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `memberid` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `email` varchar(255) NOT NULL,
  `insurance_plan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`memberid`),
  KEY `FK9ctv3va9dmy3tq2lyjye3m5fh` (`insurance_plan_id`),
  CONSTRAINT `FK9ctv3va9dmy3tq2lyjye3m5fh` FOREIGN KEY (`insurance_plan_id`) REFERENCES `insurance_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('ENM$CIzQ0edS',1,'kk8334787@gmail.com',2),('ENM$EEZbVVEP',1,'airflow.jk.14@gmail.com',1),('ENM$oXC5BZSo',1,'krishna9502202491@gmail.com',1);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `item_id` bigint NOT NULL,
  `order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf71thnlx50by3t5wgy06i1gto` (`item_id`),
  KEY `FKjjih67ljykok1a2ayy73y3awb` (`order_id`),
  CONSTRAINT `FKf71thnlx50by3t5wgy06i1gto` FOREIGN KEY (`item_id`) REFERENCES `pharm_med_info` (`id`),
  CONSTRAINT `FKjjih67ljykok1a2ayy73y3awb` FOREIGN KEY (`order_id`) REFERENCES `user_orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,33,1),(2,1,9,1),(3,1,1,1),(4,1,25,2),(5,1,1,2),(6,4,3,2),(7,3,9,2),(8,1,1,3),(9,6,25,4),(10,6,1,4),(11,1,5,5),(12,2,1,5),(13,7,5,6),(14,1,29,6);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_info`
--

DROP TABLE IF EXISTS `payment_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_info` (
  `cardid` int NOT NULL AUTO_INCREMENT,
  `card_holder_name` varchar(255) DEFAULT NULL,
  `card_number` varchar(255) DEFAULT NULL,
  `cvv` varchar(255) DEFAULT NULL,
  `expiration_date` varchar(255) DEFAULT NULL,
  `userid` int NOT NULL,
  PRIMARY KEY (`cardid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_info`
--

LOCK TABLES `payment_info` WRITE;
/*!40000 ALTER TABLE `payment_info` DISABLE KEYS */;
INSERT INTO `payment_info` VALUES (1,'KAHB','6767676767676767','454','2025-04-29',2),(2,'jkg','7867867867867867','534','2025-04-16',2);
/*!40000 ALTER TABLE `payment_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharm_med_info`
--

DROP TABLE IF EXISTS `pharm_med_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharm_med_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `unit_price` decimal(38,2) DEFAULT NULL,
  `med_id` bigint NOT NULL,
  `pharm_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6l1ibx2snjy8brawb18g0d57k` (`med_id`),
  KEY `FKjnwe3gxo10beuq842obe79wac` (`pharm_id`),
  CONSTRAINT `FK6l1ibx2snjy8brawb18g0d57k` FOREIGN KEY (`med_id`) REFERENCES `medication` (`id`),
  CONSTRAINT `FKjnwe3gxo10beuq842obe79wac` FOREIGN KEY (`pharm_id`) REFERENCES `pharmacy` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharm_med_info`
--

LOCK TABLES `pharm_med_info` WRITE;
/*!40000 ALTER TABLE `pharm_med_info` DISABLE KEYS */;
INSERT INTO `pharm_med_info` VALUES (1,18.99,1,1),(2,17.99,2,1),(3,8.99,7,1),(4,9.49,8,1),(5,21.99,5,1),(6,11.99,9,1),(7,14.99,7,1),(8,6.99,10,1),(9,29.99,9,1),(10,14.99,11,1),(11,23.99,11,1),(12,12.99,12,1),(13,19.49,1,2),(14,18.49,2,2),(15,9.49,7,2),(16,8.49,8,2),(17,22.99,5,2),(18,12.49,9,2),(19,15.99,7,2),(20,7.49,10,2),(21,30.99,9,2),(22,15.49,11,2),(23,24.99,11,2),(24,13.49,12,2),(25,20.99,1,3),(26,19.99,2,3),(27,9.99,7,3),(28,8.99,8,3),(29,23.99,5,3),(30,13.99,9,3),(31,16.99,7,3),(32,8.49,10,3),(33,32.99,9,3),(34,17.49,11,3),(35,25.99,11,3),(36,14.99,12,3),(37,8.98,3,3),(38,5.66,4,1),(39,6.77,6,2);
/*!40000 ALTER TABLE `pharm_med_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pharmacy`
--

DROP TABLE IF EXISTS `pharmacy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pharmacy` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `home_delivery` bit(1) NOT NULL,
  `lat` decimal(38,2) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `longitude` decimal(38,2) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rating` decimal(38,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pharmacy`
--

LOCK TABLES `pharmacy` WRITE;
/*!40000 ALTER TABLE `pharmacy` DISABLE KEYS */;
INSERT INTO `pharmacy` VALUES (1,_binary '',40.71,'New York, NY',-74.01,'Pharmacy A',4.50),(2,_binary '\0',34.05,'Los Angeles, CA',-118.24,'Pharmacy B',4.70),(3,_binary '',51.51,'London',-0.13,'Pharmacy C',4.20),(4,_binary '\0',48.86,'Paris',2.35,'Pharmacy D',4.60),(5,_binary '',35.69,'Tokyo',139.69,'Pharmacy E',4.80);
/*!40000 ALTER TABLE `pharmacy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `condition_name` varchar(255) DEFAULT NULL,
  `dependentid` varchar(255) DEFAULT NULL,
  `doctor_name` varchar(255) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `hospital_name` varchar(255) DEFAULT NULL,
  `prescription_url` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkhbdxtql7ftd91n832pbosmpu` (`user_id`),
  CONSTRAINT `FKkhbdxtql7ftd91n832pbosmpu` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (3,'Anasthesia',NULL,'Dr. Kate Williams','2025-04-30','Cleveland Clinic','https://res.cloudinary.com/dkezdazmt/raw/upload/v1743740063/aty1cnlpz63csi0eo4rt.pdf','2025-04-04',2);
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_med`
--

DROP TABLE IF EXISTS `prescription_med`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_med` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `medication_id` bigint NOT NULL,
  `prescription_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7j8c08d1dkalgclsy963qn7at` (`medication_id`),
  KEY `FK4wutn9uhrro30yqcfkwyh2brl` (`prescription_id`),
  CONSTRAINT `FK4wutn9uhrro30yqcfkwyh2brl` FOREIGN KEY (`prescription_id`) REFERENCES `prescription` (`id`),
  CONSTRAINT `FK7j8c08d1dkalgclsy963qn7at` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_med`
--

LOCK TABLES `prescription_med` WRITE;
/*!40000 ALTER TABLE `prescription_med` DISABLE KEYS */;
INSERT INTO `prescription_med` VALUES (3,1,3),(4,2,3);
/*!40000 ALTER TABLE `prescription_med` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `country_code` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `memberid` varchar(255) NOT NULL,
  `mobile_number` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `percentage` double DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UKo93uonug5yolngg4txxsn3d8r` (`memberid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'91','2025-04-03','krishna9502202491@gmail.com','Jayakrishna','https://res.cloudinary.com/dkezdazmt/image/upload/v1735478208/Evernorth/evernorth_logo.png','Paripelli','ENM$oXC5BZSo','9390107253','$2a$10$VaLPmyrhht389NR4t8hRqebmYJRSQ5snoP2BkzQd/k.iGquirynY.',50,'ROLE_USER'),(2,'91','2025-04-03','airflow.jk.14@gmail.com','Jayakrishna','https://res.cloudinary.com/dkezdazmt/image/upload/v1743681296/pgtcubngmsaxjqhy2oug.jpg','Paripelli','ENM$EEZbVVEP','9390107253','$2a$10$1CwglRkgKLtFtCvyQi9pbOLGnS6Xjta.WX5bW65TaM1x/eIf7KSTK',50,'ROLE_USER'),(3,'91','2025-04-04','kk8334787@gmail.com','Jayakrishna','https://res.cloudinary.com/dkezdazmt/image/upload/v1735478208/Evernorth/evernorth_logo.png','Paripelli','ENM$CIzQ0edS','9390107253','$2a$10$UbeCGIRK6RR5akmwD9p8u.NkpDQ82m8/jEDivY0k6qzhIUKkETzrq',0,'ROLE_USER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_orders`
--

DROP TABLE IF EXISTS `user_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `delivery_time` date DEFAULT NULL,
  `ordered_date` date DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  `feed_back` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FKkuspr37yv513ga1okogyxrb7m` (`user_id`),
  CONSTRAINT `FKkuspr37yv513ga1okogyxrb7m` FOREIGN KEY (`user_id`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_orders`
--

LOCK TABLES `user_orders` WRITE;
/*!40000 ALTER TABLE `user_orders` DISABLE KEYS */;
INSERT INTO `user_orders` VALUES (1,'2025-04-04','2025-04-03',77.87,'Validated',2,'Good'),(2,'2025-04-04','2025-04-03',157.61,'Delivered',2,'Good'),(3,'2025-04-04','2025-04-03',18.04,'Validated',2,'Wrong medicine'),(4,'2025-04-05','2025-04-04',227.89,'Validated',2,'Good'),(5,'2025-04-05','2025-04-04',56.97,'Pending',2,NULL),(6,'2025-04-05','2025-04-04',169.02,'Pending',2,NULL);
/*!40000 ALTER TABLE `user_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'evernorth'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-23  2:15:58
