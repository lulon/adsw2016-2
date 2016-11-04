CREATE TABLE IF NOT EXISTS `contact` (
  `idcontact` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(10) NOT NULL,
  `to_call` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`idcontact`)
);

CREATE TABLE IF NOT EXISTS `user` (
  `iduser` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(10) NOT NULL,
  `paasword` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`)
);

CREATE TABLE IF NOT EXISTS `admin` (
  `idadmin` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(10) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idadmin`)
);

CREATE TABLE IF NOT EXISTS `quiz` (
  `idquiz` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `link` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idquiz`)
);