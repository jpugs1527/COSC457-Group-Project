CREATE TABLE IF NOT EXISTS `contact` (
  `contact_id` INT NOT NULL AUTO_INCREMENT,
  `fName` text NOT NULL,
  `lName` text NOT NULL,
  `mob_no` varchar(10) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`contact_id`))
  AUTO_INCREMENT=1;