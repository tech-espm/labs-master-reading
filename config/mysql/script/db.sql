CREATE SCHEMA `master_reading` ;

CREATE TABLE `master_reading`.`master` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `recommendation` VARCHAR(500) NOT NULL,
  `picture` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `first_name_UNIQUE` (`first_name` ASC),
  UNIQUE INDEX `last_name_UNIQUE` (`last_name` ASC),
  UNIQUE INDEX `picture_UNIQUE` (`picture` ASC));

/*  
CREATE TABLE `master_reading`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(70) NOT NULL,
  `login` VARCHAR(89) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `type` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC));
*/