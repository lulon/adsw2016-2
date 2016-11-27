CREATE TABLE IF NOT EXISTS `contact` (
  `idcontact` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`idcontact`)
);

CREATE TABLE IF NOT EXISTS `user` (
  `iduser` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(10) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
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

CREATE TABLE IF NOT EXISTs `project` (
  `idproject` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `startdate` DATE NOT NULL,
  `finishdate` DATE NOT NULL,
  `customer` VARCHAR(100),
  PRIMARY KEY(`idproject`)
);

CREATE TABLE IF NOT EXISTS `quiz` (
  `idquiz` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `link` VARCHAR(200) NOT NULL,
  `activated` BOOL DEFAULT TRUE,
  `idproject` INT(11) NOT NULL,
  PRIMARY KEY (`idquiz`),
  FOREIGN KEY(`idproject`) REFERENCES project(idproject)
);

CREATE TABLE IF NOT EXISTS `call` (
  `idcontact` INT(11) NOT NULL,
  `idquiz` INT(11) NOT NULL,
  `duration` INT(11),
  `date`	DATE NOT NULL,
  `status`	VARCHAR(30),
  PRIMARY KEY(`idcontact`,`idquiz`),
  FOREIGN KEY(`idcontact`) REFERENCES contact(idcontact),
  FOREIGN KEY(`idquiz`) REFERENCES quiz(idquiz)
  );
  
