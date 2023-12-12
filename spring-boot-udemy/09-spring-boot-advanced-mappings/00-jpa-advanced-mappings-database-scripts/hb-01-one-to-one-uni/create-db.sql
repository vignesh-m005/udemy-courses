DROP SCHEMA IF EXISTS hb-01-one-to-one-uni;

CREATE SCHEMA hb_01_one_to_one_uni;

set schema 'hb_01_one_to_one_uni';

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE instructor_detail (
  id int NOT NULL Generated always as identity,
  youtube_channel varchar(128) DEFAULT NULL,
  hobby varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE instructor (
  id int NOT NULL generated always as identity,
  first_name varchar(45) DEFAULT NULL,
  last_name varchar(45) DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  instructor_detail_id int DEFAULT NULL,
  PRIMARY KEY (id),
  --KEY `FK_DETAIL_idx` (`instructor_detail_id`),
  CONSTRAINT FK_DETAIL FOREIGN KEY (instructor_detail_id) REFERENCES instructor_detail (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

SET FOREIGN_KEY_CHECKS = 1;

select * from instructor_detail;
select * from instructor;
