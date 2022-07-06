-- create database
CREATE DATABASE ecobricks;
-- create user
CREATE USER ecobricks WITH PASSWORD 'ecobricks'
-- grant permissions to tables
GRANT ALL
ON ALL TABLES
IN SCHEMA "public"
TO admin ;
-- grant permissions to sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ecobricks;

