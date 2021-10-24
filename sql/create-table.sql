CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(70) NOT NULL,
	email VARCHAR(70) NOT NULL,
	password VARCHAR(100) NOT NULL
);
ALTER TABLE users
ADD phone character varying(20),
ADD  city character varying(40),
 ADD   state character varying(50), 
ADD    country character varying(50), 
ADD    address character varying(900),
 ADD   job_role character varying(60),
ADD    cost numeric,
 ADD   capacity numeric