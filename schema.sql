DROP DATABASE IF EXISTS historical_price;
CREATE DATABASE historical_price;
USE historical_price; 

CREATE TABLE goldPrice (
  id int NOT NULL AUTO_INCREMENT,
  date int NOT NULL,
  price decimal(6,2) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE silverPrice (
  id int NOT NULL AUTO_INCREMENT,
  date int NOT NULL,
  price decimal(5,3) NOT NULL,
  PRIMARY KEY(id)
);