-- ================================================================
-- SARTHAK INSTITUTE COACHING MANAGEMENT SYSTEM - DATABASE SCHEMA
-- MySQL 8.0+ Schema Definition
-- ================================================================

CREATE DATABASE IF NOT EXISTS `sarthak_institute_db`
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `sarthak_institute_db`;

-- ----------------------------------------------------------------
-- 1. USERS TABLE (Students & Admins)
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` VARCHAR(30) UNIQUE NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('STUDENT', 'ADMIN') DEFAULT 'STUDENT',
  `class_level` VARCHAR(50) DEFAULT 'Class 12',
  `stream` VARCHAR(100) DEFAULT 'Science (PCM / PCB)',
  `parent_name` VARCHAR(100) DEFAULT '',
  `dob` DATE DEFAULT NULL,
  `gender` VARCHAR(20) DEFAULT 'Male',
  `address` TEXT,
  `board_name` VARCHAR(100) DEFAULT 'CBSE Board',
  `target_exam` VARCHAR(100) DEFAULT 'JEE Mains + Advanced',
  `photo_url` VARCHAR(255) DEFAULT NULL,
  `profile_completed` BOOLEAN DEFAULT FALSE,
  `can_edit_once` BOOLEAN DEFAULT FALSE,
  `edit_request_status` ENUM('NONE', 'PENDING', 'APPROVED', 'REJECTED') DEFAULT 'NONE',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 2. COURSES TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `stream` VARCHAR(100) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `fee_monthly` DECIMAL(10, 2) NOT NULL,
  `fee_yearly` DECIMAL(10, 2) NOT NULL,
  `subjects_json` JSON NOT NULL,
  `description` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 3. PAYMENT RECEIPTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `payment_receipts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `receipt_no` VARCHAR(50) UNIQUE NOT NULL,
  `payment_id` VARCHAR(50) UNIQUE NOT NULL,
  `student_id` VARCHAR(30) NOT NULL,
  `student_name` VARCHAR(100) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `course_name` VARCHAR(150) NOT NULL,
  `fee_type` ENUM('Monthly', 'Yearly') NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `payment_method` ENUM('UPI', 'Cash', 'Bank Transfer') NOT NULL,
  `transaction_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Paid', 'Pending', 'Failed') DEFAULT 'Paid',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_student_receipts` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 4. STUDY NOTES TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `notes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `chapter` VARCHAR(150) NOT NULL,
  `file_size` VARCHAR(30) DEFAULT '2.4 MB',
  `file_url` VARCHAR(255) NOT NULL,
  `uploaded_by` VARCHAR(100) DEFAULT 'Rakesh Sir',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_notes_filter` (`class_level`, `subject`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 5. ONLINE TESTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `online_tests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `duration_minutes` INT DEFAULT 30,
  `total_questions` INT DEFAULT 10,
  `negative_marking` BOOLEAN DEFAULT TRUE,
  `negative_mark_value` DECIMAL(4, 2) DEFAULT 0.25,
  `created_by` VARCHAR(100) DEFAULT 'Rakesh Sir',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 6. TEST QUESTIONS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `test_id` INT NOT NULL,
  `question_text` TEXT NOT NULL,
  `options_json` JSON NOT NULL,
  `correct_index` INT NOT NULL,
  `explanation` TEXT,
  FOREIGN KEY (`test_id`) REFERENCES `online_tests`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 7. TEST ATTEMPTS & RESULTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `test_attempts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `test_id` INT NOT NULL,
  `test_title` VARCHAR(200) NOT NULL,
  `student_id` VARCHAR(30) NOT NULL,
  `score` DECIMAL(6, 2) NOT NULL,
  `total_marks` INT NOT NULL,
  `percentage` DECIMAL(5, 2) NOT NULL,
  `rank_val` INT DEFAULT 1,
  `attempt_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `correct_count` INT DEFAULT 0,
  `wrong_count` INT DEFAULT 0,
  `answers_json` JSON DEFAULT NULL,
  INDEX `idx_student_attempts` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 8. ATTENDANCE TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `attendance` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` VARCHAR(30) NOT NULL,
  `date` DATE NOT NULL,
  `status` ENUM('Present', 'Absent', 'Late') DEFAULT 'Present',
  `subject` VARCHAR(100) DEFAULT 'Core Lectures',
  `remarks` VARCHAR(100) DEFAULT 'On Time',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uniq_student_date` (`student_id`, `date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 9. HOMEWORKS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `homeworks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `desc_text` TEXT NOT NULL,
  `due_date` VARCHAR(50) NOT NULL,
  `status` ENUM('Pending', 'Completed') DEFAULT 'Pending',
  `assigned_by` VARCHAR(100) DEFAULT 'Rakesh Sir',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 10. ASSIGNMENTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `assignments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `subject` VARCHAR(100) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `desc_text` TEXT NOT NULL,
  `due_date` VARCHAR(50) NOT NULL,
  `pdf_url` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 11. NOTICES TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `notices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `category` VARCHAR(50) DEFAULT 'Examination',
  `date_str` VARCHAR(50) NOT NULL,
  `desc_text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 12. ANNOUNCEMENTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `badge_tag` VARCHAR(50) DEFAULT 'NEW BATCH',
  `desc_text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 13. GALLERY IMAGES TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `category` VARCHAR(50) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 14. PROFILE EDIT REQUESTS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `profile_edit_requests` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` VARCHAR(30) NOT NULL,
  `student_name` VARCHAR(100) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `reason` TEXT,
  `status` ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
  `request_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------------------------------------------
-- 15. PENDING REGISTRATIONS TABLE
-- ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `pending_registrations` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` VARCHAR(30) UNIQUE NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `parent_name` VARCHAR(100) NOT NULL,
  `class_level` VARCHAR(50) NOT NULL,
  `stream` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `status` ENUM('PENDING_APPROVAL', 'APPROVED', 'REJECTED') DEFAULT 'PENDING_APPROVAL',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
