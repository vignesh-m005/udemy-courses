


CREATE TABLE instructor_detail (
  id int NOT NULL generated always as identity,
  youtube_channel varchar(128) DEFAULT NULL,
  hobby varchar(45) DEFAULT NULL,
  PRIMARY KEY (id)
) ;




CREATE TABLE instructor (
  id int NOT NULL generated always as identity,
  first_name varchar(45) DEFAULT NULL,
  last_name varchar(45) DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  instructor_detail_id int DEFAULT NULL,
  PRIMARY KEY (id),
  --KEY `FK_DETAIL_idx` (`instructor_detail_id`),
  CONSTRAINT FK_DETAIL FOREIGN KEY (instructor_detail_id) 
  REFERENCES instructor_detail (id) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;



CREATE TABLE course (
  id int NOT NULL generated always as identity,
  title varchar(128) DEFAULT NULL,
  instructor_id int DEFAULT NULL,
  
  PRIMARY KEY (id),
  
  UNIQUE   (title),
  
  --KEY `FK_INSTRUCTOR_idx` (`instructor_id`),
  
  CONSTRAINT FK_INSTRUCTOR 
  FOREIGN KEY (instructor_id) 
  REFERENCES instructor (id) 
  
  ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

select * from course;
select * from instructor;
select * from instructor_detail;