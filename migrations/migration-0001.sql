USE `inatinder_dev` ;

ALTER TABLE `user` MODIFY `user_infos_id` INT NULL;

-- alter fk_user_user_infos constraint to on delete cascade
ALTER TABLE `user` DROP FOREIGN KEY `fk_user_user_infos`;
ALTER TABLE `user` ADD CONSTRAINT `fk_user_user_infos`
    FOREIGN KEY (`user_infos_id`)
    REFERENCES `inatinder_dev`.`user_infos` (`id`)
    ON DELETE CASCADE ON UPDATE NO ACTION;