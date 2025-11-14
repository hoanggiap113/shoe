CREATE DATABASE  IF NOT EXISTS `shoe` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shoe`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: shoe
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `chitietdonhang`
--

DROP TABLE IF EXISTS `chitietdonhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chitietdonhang` (
  `MaCTDH` int NOT NULL AUTO_INCREMENT,
  `MaDH` int DEFAULT NULL,
  `MaSP` int DEFAULT NULL,
  `SoLuong` int NOT NULL,
  `DonGia` decimal(10,2) NOT NULL,
  PRIMARY KEY (`MaCTDH`),
  KEY `MaDH` (`MaDH`),
  KEY `MaSP` (`MaSP`),
  CONSTRAINT `chitietdonhang_ibfk_1` FOREIGN KEY (`MaDH`) REFERENCES `donhang` (`MaDH`),
  CONSTRAINT `chitietdonhang_ibfk_2` FOREIGN KEY (`MaSP`) REFERENCES `sanpham` (`MaSP`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chitietdonhang`
--

LOCK TABLES `chitietdonhang` WRITE;
/*!40000 ALTER TABLE `chitietdonhang` DISABLE KEYS */;
INSERT INTO `chitietdonhang` VALUES (1,1,1,1,3200000.00),(2,1,2,1,4500000.00),(3,2,3,2,2500000.00),(4,3,4,1,2000000.00),(5,4,5,1,5000000.00),(6,5,6,1,2200000.00),(7,6,7,1,3500000.00),(8,6,8,1,4200000.00),(9,7,9,1,1800000.00),(10,8,10,1,2800000.00),(11,8,11,1,3800000.00),(12,9,12,1,2900000.00),(13,10,13,1,4500000.00),(14,10,14,1,3300000.00),(15,10,15,1,3100000.00);
/*!40000 ALTER TABLE `chitietdonhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diachigiaohang`
--

DROP TABLE IF EXISTS `diachigiaohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diachigiaohang` (
  `MaDiaChi` int NOT NULL AUTO_INCREMENT,
  `MaDH` int NOT NULL,
  `DiaChiChiTiet` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `QuanHuyen` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Thanhpho` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaDiaChi`),
  KEY `idx_thanhpho` (`Thanhpho`),
  KEY `idx_quanhuyen` (`QuanHuyen`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diachigiaohang`
--

LOCK TABLES `diachigiaohang` WRITE;
/*!40000 ALTER TABLE `diachigiaohang` DISABLE KEYS */;
INSERT INTO `diachigiaohang` VALUES (1,1,'123 Đường ABC','Quận 1','TP. HCM'),(2,2,'456 Đường XYZ','Quận Ba Đình','Hà Nội'),(3,3,'789 Đường DEF','Quận Hải Châu','Đà Nẵng'),(4,4,'123 Đường ABC','Quận 1','TP. HCM'),(5,5,'111 Đường GHI','Quận 5','TP. HCM'),(6,6,'222 Đường JKL','Quận Thanh Xuân','Hà Nội'),(7,7,'456 Đường XYZ','Quận Ba Đình','Hà Nội'),(8,8,'789 Đường DEF','Quận Hải Châu','Đà Nẵng'),(9,9,'222 Đường JKL','Quận Thanh Xuân','Hà Nội'),(10,10,'123 Đường ABC','Quận 1','TP. HCM');
/*!40000 ALTER TABLE `diachigiaohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donhang`
--

DROP TABLE IF EXISTS `donhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donhang` (
  `MaDH` int NOT NULL AUTO_INCREMENT,
  `TenKH` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SDT` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Note` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MaTrangthai` int DEFAULT NULL,
  `TongTien` decimal(10,2) NOT NULL,
  `NgayDat` datetime DEFAULT CURRENT_TIMESTAMP,
  `MaDiaChi` int DEFAULT NULL,
  PRIMARY KEY (`MaDH`),
  KEY `MaTrangthai` (`MaTrangthai`),
  KEY `fk_donhang_diachi` (`MaDiaChi`),
  CONSTRAINT `donhang_ibfk_2` FOREIGN KEY (`MaTrangthai`) REFERENCES `trangthai` (`MaTrangthai`),
  CONSTRAINT `fk_donhang_diachi` FOREIGN KEY (`MaDiaChi`) REFERENCES `diachigiaohang` (`MaDiaChi`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donhang`
--

LOCK TABLES `donhang` WRITE;
/*!40000 ALTER TABLE `donhang` DISABLE KEYS */;
INSERT INTO `donhang` VALUES (1,'Nguyễn Văn A','0901234567','Giao giờ hành chính',3,7700000.00,'2025-11-08 21:40:10',1),(2,'Trần Thị B','0912345678','Liên hệ trước khi giao',3,5000000.00,'2025-11-08 21:40:10',2),(3,'Lê Văn C','0923456789','NULL',2,2000000.00,'2025-11-08 21:40:10',3),(4,'Phạm Thị D','0934567890','Khách quen',1,5000000.00,'2025-11-08 21:40:11',4),(5,'Ngô Văn E','0945678901','NULL',4,2200000.00,'2025-11-08 21:40:11',5),(6,'Hoàng Thị F','0956789012','Giao buổi sáng',3,7700000.00,'2025-11-08 21:40:11',6),(7,'Đỗ Văn G','0967890123','NULL',3,1800000.00,'2025-11-08 21:40:11',7),(8,'Phan Thị H','0978901234','Không giao CN',2,6600000.00,'2025-11-08 21:40:11',8),(9,'Bùi Văn I','0989012345','NULL',1,2900000.00,'2025-11-08 21:40:11',9),(10,'Vũ Thị K','0990123456','Ưu tiên ship nhanh',3,10900000.00,'2025-11-08 21:40:11',10);
/*!40000 ALTER TABLE `donhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hang`
--

DROP TABLE IF EXISTS `hang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hang` (
  `MaHang` int NOT NULL AUTO_INCREMENT,
  `TenHang` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Mota` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`MaHang`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hang`
--

LOCK TABLES `hang` WRITE;
/*!40000 ALTER TABLE `hang` DISABLE KEYS */;
INSERT INTO `hang` VALUES (1,'Nike','Thương hiệu giày thể thao hàng đầu thế giới.'),(2,'Adidas','Thương hiệu giày thể thao nổi tiếng của Đức.'),(3,'Puma','Thương hiệu giày và trang phục thể thao.'),(4,'Converse','Nổi tiếng với dòng giày Chuck Taylor All-Star.');
/*!40000 ALTER TABLE `hang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `khachhang`
--

DROP TABLE IF EXISTS `khachhang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khachhang` (
  `MaKH` int NOT NULL AUTO_INCREMENT,
  `TenKH` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Sdt` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MatKhau` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Lưu ý: nên băm (hash) mật khẩu',
  PRIMARY KEY (`MaKH`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khachhang`
--

LOCK TABLES `khachhang` WRITE;
/*!40000 ALTER TABLE `khachhang` DISABLE KEYS */;
INSERT INTO `khachhang` VALUES (1,'Nguyễn Văn An','an.nguyen@example.com','0901234567','hashed_password_123'),(2,'Trần Thị Bình','binh.tran@example.com','0912345678','hashed_password_123'),(3,'Lê Văn Chí','chi.le@example.com','0987654321','hashed_password_123'),(4,'Phạm Thị Dung','dung.pham@example.com','0977123456','hashed_password_123'),(5,'Hoàng Văn Em','em.hoang@example.com','0966789012','hashed_password_123');
/*!40000 ALTER TABLE `khachhang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `MaSP` int NOT NULL AUTO_INCREMENT,
  `TenSP` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MoTa` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Gia` decimal(10,2) NOT NULL,
  `SoLuongTon` int DEFAULT '0',
  `KichCo` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MauSac` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `HinhAnh` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MaHang` int DEFAULT NULL,
  `GioiTinh` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MucDich` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TrangThai` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaSP`),
  KEY `MaHang` (`MaHang`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`MaHang`) REFERENCES `hang` (`MaHang`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Giày Nike Air Force 1 \'07 LV8','Phiên bản nâng cấp của dòng AF1 huyền thoại.',3200000.00,50,'39','Trắng','/files/uploads/files-1762615606862-924100135.avif',1,'Nam','Thời trang','Còn bán'),(2,'Giày Adidas Ultraboost 5.0 DNA','Đế boost êm ái, hỗ trợ chạy bộ tuyệt vời.',4500000.00,30,'40','Đen','/files/uploads/files-1762615652859-908491045.avif',2,'Nam','Chạy bộ','Còn bán'),(3,'Giày Puma Suede Classic XXI','Thiết kế cổ điển, da lộn cao cấp.',2500000.00,40,'38','Đỏ','/files/uploads/files-1762615686534-286032713.avif',3,'Nữ','Thời trang','Còn bán'),(4,'Giày Converse Chuck 70 High Top','Bản nâng cấp của Chuck Taylor cổ điển.',2000000.00,60,'37','Vàng','/files/uploads/files-1762615722332-331737871.webp',4,'Unisex','Thời trang','Còn bán'),(5,'Giày Nike Air Jordan 1 Mid','Dòng giày bóng rổ biểu tượng.',5000000.00,20,'42','Xanh','/files/uploads/files-1762615746453-145038870.avif',1,'Nam','Bóng rổ','Còn bán'),(6,'Giày Adidas Stan Smith','Thiết kế tối giản, huyền thoại sân tennis.',2200000.00,50,'36','Trắng','/files/uploads/files-1762615760476-35229262.avif',2,'Unisex','Thời trang','Còn bán'),(7,'Giày Puma RS-X³','Thiết kế hầm hố, phong cách retro-futuristic.',3500000.00,25,'41','Đa sắc','/files/uploads/files-1762615785461-782744037.jpg',3,'Nam','Thời trang','Còn bán'),(8,'Giày Nike Air Max 90','Đệm khí Air-Sole nhìn thấy được.',4200000.00,30,'40','Trắng','/files/uploads/files-1762615822924-859005940.avif',1,'Nam','Thời trang','Còn bán'),(9,'Giày Converse Jack Purcell','Mũi giày \"mặt cười\" đặc trưng.',1800000.00,40,'38','Trắng','/files/uploads/files-1762615856225-449385330.jpg',4,'Unisex','Thời trang','Còn bán'),(10,'Giày Nike Blazer Mid \'77 Vintage','Phong cách vintage, cổ cao.',2800000.00,35,'39','Trắng','/files/uploads/files-1762615886819-140825218.avif',1,'Nữ','Thời trang','Còn bán'),(11,'Giày Adidas NMD_R1','Kết hợp giữa phong cách đường phố và công nghệ.',3800000.00,30,'42','Đen','/files/uploads/files-1762615924270-430790093.avif',2,'Nam','Thời trang','Còn bán'),(12,'Giày Puma Future Rider','Lấy cảm hứng từ giày chạy bộ cổ điển.',2900000.00,20,'37','Hồng','/files/uploads/files-1762615938459-851223538.jpg',3,'Nữ','Thời trang','Còn bán'),(13,'Giày Nike Dunk Low Retro','Một biểu tượng của văn hóa sneaker.',4500000.00,15,'41','Trắng','/files/uploads/files-1762615966456-735125070.jpg',1,'Unisex','Thời trang','Còn bán'),(14,'Giày Adidas Forum Low','Thiết kế bóng rổ cổ điển của thập niên 80.',3300000.00,25,'40','Trắng','/files/uploads/files-1762615988574-586651081.avif',2,'Nam','Thời trang','Còn bán'),(15,'Giày Converse Run Star Hike','Đế platform cá tính.',3100000.00,30,'38','Đen','/files/uploads/files-1762616002141-462379022.webp',4,'Nữ','Thời trang','Còn bán');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trangthai`
--

DROP TABLE IF EXISTS `trangthai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trangthai` (
  `MaTrangthai` int NOT NULL AUTO_INCREMENT,
  `TenTrangthai` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MaTrangthai`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trangthai`
--

LOCK TABLES `trangthai` WRITE;
/*!40000 ALTER TABLE `trangthai` DISABLE KEYS */;
INSERT INTO `trangthai` VALUES (1,'Chờ xác nhận'),(2,'Đang giao'),(3,'Hoàn thành'),(4,'Đã huỷ');
/*!40000 ALTER TABLE `trangthai` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 21:17:42
