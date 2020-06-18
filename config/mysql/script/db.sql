CREATE SCHEMA `master_reading` ;

CREATE TABLE `master_reading`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(70) NOT NULL,
  `login` VARCHAR(89) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `type` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC),
  UNIQUE INDEX `password_UNIQUE` (`password` ASC));