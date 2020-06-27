CREATE SCHEMA `master_reading` ;

CREATE TABLE `master_reading`.`publication` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `master` VARCHAR(70) NOT NULL,
  `recommendation` VARCHAR(500) NOT NULL,
  `picture` VARCHAR(10),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `recommendation_UNIQUE` (`recommendation` ASC),
  UNIQUE INDEX `picture_UNIQUE` (`picture` ASC));