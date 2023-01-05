-- Function to create the database for employees at the company
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- Function to use the specific database
USE employee_db;

-- Creating the first table of the various departments within the company
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) 
);
SELECT * FROM department;

-- Creating the second table of the Current Job Titles at the company with salary and 
CREATE TABLE Job_Title (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary INT,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
SELECT * FROM Job_Title;

-- Creating the third table of the specific employee and their relation to the company and manager (if any)
CREATE TABLE Person (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
	FOREIGN KEY (role_id) REFERENCES Job_Title(id),
	FOREIGN KEY (manager_id) REFERENCES Person(id) 
    ON DELETE SET NULL
);
SELECT * FROM department;