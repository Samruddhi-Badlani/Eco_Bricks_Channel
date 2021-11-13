CREATE TABLE form(
	id SERIAL PRIMARY KEY,
    userid integer NULL, 
	fname VARCHAR(70) NULL,
	lname VARCHAR(70) NULL,
    email VARCHAR(70) NULL,
    mob VARCHAR(70) NULL,
    ques1 VARCHAR(70) NULL,
    ques2 VARCHAR(70) NULL
);