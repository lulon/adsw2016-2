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
  PRIMARY KEY (`idquiz`)contact
);

INSERT INTO contact ('name', 'last_name', 'phone', 'to_call') VALUES 
	('juan','ximenes','56538253','si'),
	('marcelo','treimun','74362822','si'),
	('pedro','hernandez','53323857','no'),
	('juan','duarte','76453857','no'),
	('pablo','ibarra','63535869','si'),
	('gabriela','perez','76453987','si');
	
INSERT INTO user ('name', 'last_name', 'username', 'password') VALUES 
	('saulo','bernal','sbernal','1234');
	
INSERT INTO admin ('name', 'last_name', 'username', 'password') VALUES 
	('alonso','rodriguez','arodriguez','1234');
