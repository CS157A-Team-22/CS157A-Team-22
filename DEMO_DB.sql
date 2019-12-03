-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cs157a
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addtoinventory`
--

DROP TABLE IF EXISTS `addtoinventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addtoinventory` (
  `callNumber` char(12) DEFAULT NULL,
  `libraryCardNumber` int(12) DEFAULT NULL,
  KEY `libraryCardNumber` (`libraryCardNumber`),
  KEY `callNumber` (`callNumber`),
  CONSTRAINT `addtoinventory_ibfk_1` FOREIGN KEY (`libraryCardNumber`) REFERENCES `user` (`libraryCardNumber`),
  CONSTRAINT `addtoinventory_ibfk_2` FOREIGN KEY (`callNumber`) REFERENCES `item` (`callNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addtoinventory`
--

LOCK TABLES `addtoinventory` WRITE;
/*!40000 ALTER TABLE `addtoinventory` DISABLE KEYS */;
INSERT INTO `addtoinventory` VALUES ('100001',16),('100002',17),('100003',23),('100004',22),('100005',17),('100006',20),('100007',23),('100008',17),('100009',22),('100010',17),('100011',17),('100012',28),('100013',23),('100014',19),('100015',26);
/*!40000 ALTER TABLE `addtoinventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `callNumber` char(12) DEFAULT NULL,
  `author` varchar(40) DEFAULT NULL,
  KEY `callNumber` (`callNumber`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`callNumber`) REFERENCES `item` (`callNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('100001','Harper Lee'),('100002','J. D. Salinger'),('100003','William Golding'),('100004','F. Scott Fitzgerald'),('100005','George Orwell'),('100006','Jane Austen'),('100007','Ernest Hemingway'),('100008','Margaret Mitchell'),('100009','Mark Twain'),('100010','Mark Twain'),('100011','Dr. Seuss'),('100012','Dr. Seuss'),('100013','Dr. Seuss'),('100014','Adam Savage'),('100015','Dale Carnegie'),('100016','Gayle Laakmann McDowell'),('100017','Cecil Martin'),('100018','Joseph Heller'),('100019','John Steinbeck'),('100020','Charlotte Bronte'),('100021','Suzanne Collins'),('100022','Thomas Cormen'),('100023','Bjarne Stroustrup'),('100024','Jerome K. Jerome'),('100025','Douglas Adams'),('100026','Paul Beatty'),('100027','Andy Weir'),('100028','Ernest Cline'),('100029','Andy Weir'),('100030','Orson Scott Card'),('100031','Issac Asimov');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrows`
--

DROP TABLE IF EXISTS `borrows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrows` (
  `borrowDate` date DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `overdue` tinyint(1) DEFAULT NULL,
  `returnDate` date DEFAULT NULL,
  `numberRenewals` int(2) DEFAULT NULL,
  `callNumber` char(12) DEFAULT NULL,
  `libraryCardNumber` int(12) DEFAULT NULL,
  KEY `libraryCardNumber` (`libraryCardNumber`),
  KEY `callNumber` (`callNumber`),
  CONSTRAINT `borrows_ibfk_1` FOREIGN KEY (`libraryCardNumber`) REFERENCES `user` (`libraryCardNumber`),
  CONSTRAINT `borrows_ibfk_2` FOREIGN KEY (`callNumber`) REFERENCES `item` (`callNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrows`
--

LOCK TABLES `borrows` WRITE;
/*!40000 ALTER TABLE `borrows` DISABLE KEYS */;
INSERT INTO `borrows` VALUES ('2019-03-01','2019-12-17',0,'2019-03-05',1,'100006',12),('2019-04-15','2019-04-22',0,'2019-04-22',0,'300006',1),('2019-06-12','2019-06-19',0,'2019-06-19',0,'300002',3),('2019-06-25','2019-07-02',0,'2019-07-01',0,'100004',12),('2019-09-01','2019-09-08',0,'2019-09-03',0,'100014',4),('2019-07-04','2019-12-17',0,'2019-07-10',1,'100006',8),('2019-08-17','2019-08-24',0,'2019-08-23',0,'300009',2),('2019-10-05','2019-10-12',0,'2019-10-12',0,'300001',3),('2019-11-01','2019-12-17',0,'2019-11-05',1,'100006',6),('2019-03-12','2019-03-19',0,'2019-03-15',0,'100014',9),('2019-12-03','2019-12-10',0,NULL,0,'100009',14),('2019-03-01','2019-12-17',0,'2019-03-05',1,'100006',12),('2019-04-15','2019-04-22',0,'2019-04-22',0,'300006',1),('2019-06-12','2019-06-19',0,'2019-06-19',0,'300002',3),('2019-06-25','2019-07-02',0,'2019-07-01',0,'100004',12),('2019-09-01','2019-09-08',0,'2019-09-03',0,'100014',4),('2019-07-04','2019-12-17',0,'2019-07-10',1,'100006',8),('2019-08-17','2019-08-24',0,'2019-08-23',0,'300009',2),('2019-10-05','2019-10-12',0,'2019-10-12',0,'300001',3),('2019-11-01','2019-12-17',0,'2019-11-05',1,'100006',6),('2019-03-12','2019-03-19',0,'2019-03-15',0,'100014',9),('2019-12-03','2019-12-10',0,NULL,0,'100009',14),('2019-12-05','2019-12-12',0,NULL,0,'300002',13),('2019-12-04','2019-12-17',0,'2019-12-03',1,'100006',9),('2019-12-02','2019-12-09',0,NULL,0,'300011',8),('2019-12-03','2019-12-17',0,'2019-12-03',1,'100006',0),('2019-12-03','2019-12-17',0,'2019-12-03',1,'100006',6897),('2019-12-03','2019-12-10',0,'2019-12-03',0,'100005',6897),('2019-12-03','2019-12-10',0,'2019-12-03',0,'100007',6897),('2019-12-03','2019-12-10',0,'2019-12-03',0,'100012',6897),('2019-12-03','2019-12-17',0,'2019-12-03',1,'100002',0),('2019-12-03','2019-12-17',0,'2019-12-03',1,'100002',6897),('2019-12-03','2019-12-10',0,NULL,0,'100010',0);
/*!40000 ALTER TABLE `borrows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `libraryCardNumber` int(12) NOT NULL,
  `accountStart` date NOT NULL,
  `accountExpiry` date NOT NULL,
  `fines` float DEFAULT NULL,
  PRIMARY KEY (`libraryCardNumber`),
  CONSTRAINT `customer_ibfk_1` FOREIGN KEY (`libraryCardNumber`) REFERENCES `user` (`libraryCardNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (0,'2019-04-15','2024-04-15',0),(1,'2019-03-09','2024-03-09',0),(2,'2019-02-21','2024-02-21',0),(3,'2015-04-15','2020-04-15',0),(4,'2019-05-15','2024-05-15',0),(5,'2019-07-15','2024-07-15',0),(6,'2019-08-15','2024-08-15',0),(7,'2019-10-01','2024-10-01',0),(8,'2019-03-15','2024-03-15',0),(9,'2018-06-15','2023-06-15',0),(10,'2019-03-15','2024-03-15',0),(11,'2019-07-03','2024-07-03',0),(12,'2019-09-05','2024-09-05',0),(13,'2018-04-15','2023-04-15',0),(14,'2017-04-15','2022-04-15',0),(6897,'2019-12-03','2022-12-03',0);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hold`
--

DROP TABLE IF EXISTS `hold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hold` (
  `holdDate` date DEFAULT NULL,
  `callNumber` char(12) DEFAULT NULL,
  `libraryCardNumber` int(12) DEFAULT NULL,
  KEY `libraryCardNumber` (`libraryCardNumber`),
  KEY `callNumber` (`callNumber`),
  CONSTRAINT `hold_ibfk_1` FOREIGN KEY (`libraryCardNumber`) REFERENCES `user` (`libraryCardNumber`),
  CONSTRAINT `hold_ibfk_2` FOREIGN KEY (`callNumber`) REFERENCES `item` (`callNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hold`
--

LOCK TABLES `hold` WRITE;
/*!40000 ALTER TABLE `hold` DISABLE KEYS */;
INSERT INTO `hold` VALUES ('2019-12-01','100017',1),('2019-12-02','100018',5),('2019-11-29','100019',8),('2019-11-29','100020',4),('2019-11-28','100021',7),('2019-11-28','100022',5),('2019-12-02','100023',14),('2019-12-03','100024',13),('2019-12-03','100025',13),('2019-12-03','100026',12),('2019-12-01','100027',9),('2019-12-01','100028',3),('2019-12-02','100029',10),('2019-11-28','100030',11),('2019-11-27','100031',3),('2019-03-08','100006',6897),('2019-12-10','100009',6897);
/*!40000 ALTER TABLE `hold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `callNumber` char(12) NOT NULL,
  `purchasePrice` float DEFAULT NULL,
  `donated` tinyint(1) NOT NULL,
  `type` varchar(5) NOT NULL,
  `status` varchar(20) NOT NULL,
  `genre` varchar(20) NOT NULL,
  `name` varchar(80) NOT NULL,
  `releaseDate` date NOT NULL,
  `loanPeriod` int(2) NOT NULL,
  `lateFee` float NOT NULL,
  PRIMARY KEY (`callNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES ('100001',4.75,0,'book','available','Coming-of-Age','To Kill a MockingBird','1960-07-11',7,0.24),('100002',4.75,0,'book','available','Coming-of-Age','The Catcher in the Rye','1951-07-16',7,0.24),('100003',4.75,0,'book','available','Allegory','Lord of the Flies','1954-09-17',7,0.24),('100004',4.75,0,'book','available','Tragedy','The Great Gatsby','1925-04-10',7,0.24),('100005',4.75,0,'book','available','Political Satire','Animal Farm','1945-08-17',7,0.24),('100006',4.75,0,'book','available','Coming-of-Age','Pride and Prejudice','1813-01-28',7,0.24),('100007',4.75,0,'book','available','literary fiction','The Old Man and the Sea','1952-09-01',7,0.24),('100008',4.75,0,'book','available','historical fiction','Gone with the Wind','1936-06-30',7,0.24),('100009',4.75,0,'book','checked out','Satire','The Adventures of Tom Sawyer','1876-07-13',7,0.24),('100010',4.75,0,'book','checked out','Satire','The Adventures of Huckleberry Finn','1936-12-10',7,0.24),('100011',4.75,0,'book','available','Children','Oh, the Places You\'ll Go!','1990-01-22',7,0.24),('100012',4.75,0,'book','available','Children','The Cat in the Hat','1957-03-12',7,0.24),('100013',4.75,0,'book','available','Children','Green Eggs and Ham','1960-08-12',7,0.24),('100014',4.75,0,'book','available','Biography','Every Tool\'s a Hammer: Life Is What You Make It','2019-05-07',7,0.24),('100015',4.75,0,'book','available','Self-Help','How to Win Friends & Influence People','1936-10-19',7,0.24),('100016',4.75,0,'book','available','Textbook','Cracking the Coding Interview','2008-10-15',7,0.24),('100017',4.75,0,'book','on hold','Coding','Clean Code','2008-08-01',7,0.24),('100018',4.75,0,'book','on hold','Satire','Catch-22','1961-11-10',7,0.24),('100019',4.75,0,'book','on hold','Realist','The Grapes of Wrath','1939-04-14',7,0.24),('100020',4.75,0,'book','on hold','Gothic Fiction','Jane Eyre','1847-10-16',7,0.24),('100021',4.75,0,'book','on hold','Fiction','The Hunger Games','2008-09-14',7,0.24),('100022',4.75,0,'book','on hold','Textbook','Introduction to Algorithms','1989-06-12',7,0.24),('100023',4.75,0,'book','on hold','Coding','The C++ Programming Language','1985-10-12',7,0.24),('100024',4.75,0,'book','on hold','Comedy','Three Men in a Boat','1889-06-12',7,0.24),('100025',4.75,0,'book','on hold','Comedy','Hitchhiker\'s Guide to the Galaxy','1989-06-12',7,0.24),('100026',4.75,0,'book','on hold','Comedy','The Sellout','2015-03-03',7,0.24),('100027',4.75,0,'book','on hold','Sci-Fi','The Martian','2011-02-15',7,0.24),('100028',4.75,0,'book','on hold','Sci-Fi','Ready Player One','2011-08-16',7,0.24),('100029',4.75,0,'book','on hold','Sci-Fi','Artemis','2017-11-14',7,0.24),('100030',4.75,0,'book','on hold','Sci-Fi','Enders Game','1985-01-15',7,0.24),('100031',4.75,0,'book','on hold','Sci-Fi','I, Robot','1950-12-02',7,0.24),('300001',6.25,0,'movie','available','Comedy','Forest Gump','1994-07-06',7,0.46),('300002',6.25,0,'movie','checked out','Fantasy','The Wizard of Oz','1939-08-25',7,0.46),('300003',6.25,0,'movie','available','Drama','Titanic','1997-12-19',7,0.46),('300004',6.25,0,'movie','available','Sci-Fi','Back to the Future','1985-07-03',7,0.46),('300005',6.25,0,'movie','available','Comedy','Ferris Bueller\'s Day Off','1986-06-11',7,0.46),('300006',6.25,0,'movie','available','Comedy','Home Alone','1990-11-16',7,0.46),('300007',6.25,0,'movie','available','Superhero','The Avengers','2012-05-04',7,0.46),('300008',6.25,0,'movie','available','Fantasy','The Lord of the Rings: The Fellowship of the Ring','2012-05-04',7,0.46),('300009',6.25,0,'movie','available','Sci-fi','Avatar','2009-12-18',7,0.46),('300010',6.25,0,'movie','available','Sci-fi','The Terminator','2019-10-26',7,0.46),('300011',6.25,0,'movie','checked out','Fantasy','Aladdin','1992-11-25',7,0.46),('300012',6.25,0,'movie','available','Drama','Interstellar','2014-10-26',7,0.46),('300013',6.25,0,'movie','available','Drama','Django Unchained','2012-12-25',7,0.46),('300014',6.25,0,'movie','available','Fantasy','Raiders of the Lost Ark','1981-06-12',7,0.46),('300015',6.25,0,'movie','available','Thriller','Die Hard','1988-07-15',7,0.46);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `librarian`
--

DROP TABLE IF EXISTS `librarian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `librarian` (
  `libraryCardNumber` int(12) NOT NULL,
  `hireDate` date NOT NULL,
  `pay` float NOT NULL,
  PRIMARY KEY (`libraryCardNumber`),
  CONSTRAINT `librarian_ibfk_1` FOREIGN KEY (`libraryCardNumber`) REFERENCES `user` (`libraryCardNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `librarian`
--

LOCK TABLES `librarian` WRITE;
/*!40000 ALTER TABLE `librarian` DISABLE KEYS */;
INSERT INTO `librarian` VALUES (15,'2019-02-15',15),(16,'2015-03-15',15),(17,'2011-06-21',15),(18,'2012-07-19',15),(19,'2000-01-15',15),(20,'2018-06-09',15),(21,'2019-08-21',15),(22,'2017-05-18',15),(23,'2013-04-29',15),(24,'2014-11-29',15),(25,'2016-12-14',15),(26,'2011-12-15',15),(27,'2012-09-24',15),(28,'2009-03-27',15),(29,'2005-08-05',15),(2035,'2019-12-02',30);
/*!40000 ALTER TABLE `librarian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `callNumber` char(12) DEFAULT NULL,
  `actor` varchar(40) DEFAULT NULL,
  `director` varchar(40) DEFAULT NULL,
  KEY `callNumber` (`callNumber`),
  CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`callNumber`) REFERENCES `item` (`callNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES ('300001','Tom Hanks','Robert Zemeckis'),('300002','Judy Garland','Victor Fleming'),('300003','Leonardo DiCaprio','James Cameron'),('300004','Michael J. Fox','Robert Zemeckis'),('300005','Matthew Broderick','John Hughes'),('300006','Macaulay Culkin','Chris Columbus'),('300007','Robert Downey Jr.','Joss Whedon'),('300008','Elijah Wood','Peter Jackson'),('300009','Sam Worthington','James Cameron'),('300010','Arnold Schwarzenegger','James Cameron'),('300011','Robin Williams','Ron Clements'),('300012','Michael Caine','Christopher Nolan'),('300013','Jamie Foxx','Quentin Tarantino'),('300014','Harrison Ford','Steven Spielberg'),('300015','Bruce Willis','John McTiernan');
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `libraryCardNumber` int(12) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `email` varchar(40) NOT NULL,
  PRIMARY KEY (`libraryCardNumber`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (0,'Derek','Jeter','derjet@gmail.com'),(1,'Brad','Pitt','bradpit@gmail.com'),(2,'Elvis','Presley','elvpre@gmail.com'),(3,'Elton','John','eltjoh@gmail.com'),(4,'Oprah','Winfrey','oprwin@gmail.com'),(5,'Marilyn','Monroe','marmon@gmail.com'),(6,'Natalie','Portman','natpor@gmail.com'),(7,'Peter','Parker','petpar@gmail.com'),(8,'Nelson','Mandella','nelman@gmail.com'),(9,'Martin','King','markin@gmail.com'),(10,'Winston','Churchill','winchu@gmail.com'),(11,'Bill','Gates','bilgate@gmail.com'),(12,'Mahatma','Gandhi','mahgan@gmail.com'),(13,'Steve','Angello','steang@gmail.com'),(14,'Albert','Einstein','albein@gmail.com'),(15,'Paul','McCartney','paumcc@gmail.com'),(16,'Leonardo','Da Vinci','leodavi@gmail.com'),(17,'Franklin','Roosevelt','franroose@gmail.com'),(18,'Thomas','Edison','thoedin@gmail.com'),(19,'Nikola','Tesla','nikolates@gmail.com'),(20,'Rosa','Parks','rosap@gmail.com'),(21,'JK','Rowling','jkrow@gmail.com'),(22,'Niel','Armstrong','nielarm@gmail.com'),(23,'George','Orwell','geoorw@gmail.com'),(24,'Henry','Ford','henford@gmail.com'),(25,'Jesse','Owens','jessowens@gmail.com'),(26,'Pablo','Picasso','pabpicasso@gmail.com'),(27,'Michael','Jackson','mikejackson@gmail.com'),(28,'Steve','Jobs','stevej@gmail.com'),(29,'Roger','Federer','rogerfed@gmail.com'),(2035,'Michael','Test','ml@test.com'),(6897,'Timmy','Test','timmy@testing.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `callNumber` char(12) DEFAULT NULL,
  `libraryCardNumber` int(12) DEFAULT NULL,
  KEY `libraryCardNumber` (`libraryCardNumber`),
  KEY `callNumber` (`callNumber`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`libraryCardNumber`) REFERENCES `user` (`libraryCardNumber`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`callNumber`) REFERENCES `item` (`callNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES ('100002',2035),('100001',6897),('100009',6897),('100018',6897),('100023',6897),('100002',6897),('100003',6897),('100004',6897),('100008',6897),('300003',6897),('100011',6897),('100014',6897),('100020',6897),('100013',6897),('100017',6897),('100030',6897),('100031',6897),('300013',6897),('300015',6897),('300010',6897);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 14:42:00
