

DROP TABLE IF EXISTS authorities;
DROP TABLE IF EXISTS users;

--
-- Table structure for table `users`
--

CREATE TABLE users (
  username varchar(50) NOT NULL,
  password varchar(70) NOT NULL,
  enabled smallint NOT NULL,
  PRIMARY KEY (username)
) ;

--
-- Inserting data for table `users`
--

INSERT INTO users 
VALUES 
('john','{bcrypt}$2a$10$DPXs8vBhB2D2RGSvp2fTZ.P1Vj75euBvcjRe8PxqNR33bcULBc.gO',1), --test1234
('mary','{bcrypt}$2a$10$9m49UZWQUUe3xrSiX9Nn0eYJjWu.I1j/Mz2Ih2ghQjYHPYd2obLOi',1), --test123
('susan','{bcrypt}$2a$10$9m49UZWQUUe3xrSiX9Nn0eYJjWu.I1j/Mz2Ih2ghQjYHPYd2obLOi',1); --test123


--
-- Table structure for table `authorities`
--

CREATE TABLE authorities (
  username varchar(50) NOT NULL,
  authority varchar(50) NOT NULL,
  primary KEY  (username,authority),
  CONSTRAINT authorities_ibfk_1 FOREIGN KEY (username) REFERENCES users (username)
);

--
-- Inserting data for table `authorities`
--

INSERT INTO authorities VALUES 
('john','ROLE_EMPLOYEE'),
('mary','ROLE_EMPLOYEE'),
('mary','ROLE_MANAGER'),
('susan','ROLE_EMPLOYEE'),
('susan','ROLE_MANAGER'),
('susan','ROLE_ADMIN');

select * from members; --password: fun123
