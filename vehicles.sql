CREATE TABLE IF NOT EXISTS `vehicles` (
  `vin` varchar(17) NOT NULL,
  `year` varchar(4) NOT NULL,
  `make` text NOT NULL,
  `model` text NOT NULL,
  `bodystyle` text NOT NULL,
  `color` text NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`vin`));