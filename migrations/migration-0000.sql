
USE `inatinder_dev` ;

-- -----------------------------------------------------
-- Table `inatinder_dev`.`user_infos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inatinder_dev`.`user_infos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `course` VARCHAR(45) NOT NULL,
  `period` VARCHAR(45) NOT NULL,
  `hometown` VARCHAR(45) NULL,
  `biography` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inatinder_dev`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inatinder_dev`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `user_infos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_user_user_infos_idx` (`user_infos_id` ASC),
  CONSTRAINT `fk_user_user_infos`
    FOREIGN KEY (`user_infos_id`)
    REFERENCES `inatinder_dev`.`user_infos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `inatinder_dev`.`user_pics`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inatinder_dev`.`user_pics` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` LONGBLOB NULL,
  `filename` VARCHAR(45) NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_pics_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_pics_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `inatinder_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inatinder_dev`.`user_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inatinder_dev`.`user_likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `liked_user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_likes_user1_idx` (`user_id` ASC),
  INDEX `fk_user_likes_user2_idx` (`liked_user` ASC),
  CONSTRAINT `fk_user_likes_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `inatinder_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_likes_user2`
    FOREIGN KEY (`liked_user`)
    REFERENCES `inatinder_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inatinder_dev`.`places`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inatinder_dev`.`places` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `inatinder_dev`.`user_frequent_places`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `inatinder_dev`.`user_frequent_places` (
  `user_id` INT NOT NULL,
  `places_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `places_id`),
  INDEX `fk_user_has_places_places1_idx` (`places_id` ASC),
  INDEX `fk_user_has_places_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_places_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `inatinder_dev`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_places_places1`
    FOREIGN KEY (`places_id`)
    REFERENCES `inatinder_dev`.`places` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
