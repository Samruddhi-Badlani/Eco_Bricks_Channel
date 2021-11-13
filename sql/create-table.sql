CREATE TYPE role AS enum ('individual', 'company');
CREATE TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(70) NOT NULL,
	email VARCHAR(70) NOT NULL,
	password VARCHAR(100) NOT NULL,
	job_role role NOT NULL
);
ALTER TABLE users
ADD  company character varying(100),
ADD registered character varying(100),
ADD phone character varying(20),
ADD  city character varying(40),
 ADD   state character varying(50), 
ADD    country character varying(50), 
ADD    address character varying(900),
ADD    cost numeric,
 ADD   capacity numeric