-- use evernorth; 

-- create table member (
-- 	memberID varchar(12) PRIMARY KEY,
--     email varchar(255) UNIQUE NOT NULL,
--     active boolean default false
-- ); 

-- create table user (
-- 	userID INT AUTO_INCREMENT PRIMARY KEY,
-- 	memberID varchar(12) UNIQUE NOT NULL,
--     email varchar(255) UNIQUE NOT NULL,
--     first_name varchar(255) NOT NULL,
--     last_name varchar(255),
--     country_code varchar(5) NOT NULL,
--     mobile_number varchar(10) NOT NULL,
--     dob DATE NOT NULL,
--     password varchar(255) NOT NULL,
--     image varchar(255)  DEFAULT 'https://res.cloudinary.com/dkezdazmt/image/upload/v1735478208/Evernorth/evernorth_logo.png',
--     role varchar(10) DEFAULT 'MEMBER',
--     percentage DECIMAL(5, 2) DEFAULT 0 
-- );
-- ALTER TABLE user AUTO_INCREMENT=10000000;	

-- CREATE TABLE address (
--     addressID INT PRIMARY KEY AUTO_INCREMENT,
--     userID INT NOT NULL,
--     house_no VARCHAR(50),
--     landmark VARCHAR(255),
--     city VARCHAR(100),
--     state VARCHAR(100),
--     country VARCHAR(100),
--     postal_code VARCHAR(20),
--     FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
-- ); 
-- ALTER TABLE address AUTO_INCREMENT=10000000;


-- CREATE TABLE current_medications (
-- 	currentmedicationID INT PRIMARY KEY AUTO_INCREMENT,
-- 	medicationID INT UNIQUE NOT NULL,
-- 	userID INT NOT NULL,
-- 	FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
-- ); 
-- ALTER TABLE current_medications AUTO_INCREMENT=10000000;

-- create table health_conditions (
-- 	healthconditionID INT AUTO_INCREMENT PRIMARY KEY,
--     conditionID INT NOT NULL,
--     userID INT NOT NULL,
--     FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
-- );
-- ALTER TABLE health_conditions AUTO_INCREMENT=10000000;


-- create table allergies (
-- 	currentallergyID INT AUTO_INCREMENT PRIMARY KEY,
--     allergyID INT NOT NULL,
--     userID INT NOT NULL,
--     FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
-- );
-- ALTER TABLE allergies AUTO_INCREMENT=10000000;


-- create table delivery_address (
-- 	addressID INT AUTO_INCREMENT PRIMARY KEY,
--     userID INT NOT NULL,
--     house_no varchar(255),
--     landmark varchar(255),
--     city varchar(255),
--     state varchar(255),
--     country varchar(255),
--     postal_code varchar(255),
--     FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
-- );
-- ALTER TABLE delivery_address AUTO_INCREMENT=10000000;


-- CREATE TABLE payment_info (
--     cardID INT AUTO_INCREMENT PRIMARY KEY,
--     userID INT NOT NULL,
--     card_holder_name VARCHAR(255),
--     card_number VARCHAR(20),
--     expiration_date VARCHAR(10),
--     cvv VARCHAR(10),
--     FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
-- ); 
-- ALTER TABLE payment_info AUTO_INCREMENT=10000000;

-- create table dependent ( 
-- 	dependentID varchar(255) PRIMARY KEY,
--     userID INT NOT NULL,
--     name varchar(255) NOT NULL,
--     image varchar(255) NOT NULL DEFAULT 'https://res.cloudinary.com/dkezdazmt/image/upload/v1735478208/Evernorth/evernorth_logo.png',
--     FOREIGN KEY (userID) REFERENCES user(userID) ON DELETE CASCADE
-- );
-- ALTER TABLE dependent AUTO_INCREMENT=10000000;

-- create table dependent_health_condition (
-- 	dependent_condition_id INT AUTO_INCREMENT PRIMARY KEY,
--     conditionID INT NOT NULL,
--     dependentID varchar(255) NOT NULL,
--     FOREIGN KEY (dependentID) REFERENCES dependent(dependentID) ON DELETE CASCADE
-- );
-- ALTER TABLE dependent_health_condition AUTO_INCREMENT=10000000;


-- create table dependent_allergy (
-- 	dependent_allergy_id INT AUTO_INCREMENT PRIMARY KEY,
--     allergyID INT NOT NULL,
--     dependentID varchar(255) NOT NULL,
--     FOREIGN KEY (dependentID) REFERENCES dependent(dependentID) ON DELETE CASCADE
-- );
-- ALTER TABLE dependent_allergy AUTO_INCREMENT=10000000;

-- create table dependent_medication (
--     dependent_medication_id INT AUTO_INCREMENT PRIMARY KEY,
--     medicationID INT NOT NULL,
--     dependentID varchar(255) NOT NULL,
--     FOREIGN KEY (dependentID) REFERENCES dependent(dependentID) ON DELETE CASCADE
-- )

-- ALTER TABLE dependent_medication AUTO_INCREMENT=10000000;