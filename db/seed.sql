
-- Making sure we use the right database when seeding the employee's information
USE employee_db;

-- FIRST TABLE: Displaying the various departments within the company
INSERT INTO department (department) 
VALUES ('Human Resources');
INSERT INTO department (department) 
VALUES ('Information Technology');
INSERT INTO department (department) 
VALUES ('Accounting');
INSERT INTO department (department) 
VALUES ('Sales');
INSERT INTO department (department) 
VALUES ('Management');
INSERT INTO department (department) 
VALUES ('Social Media');

-- SECOND TABLE: Displaying the informationn for each job title, salary with department ID
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('HR Manager', 82730, 1);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('Full Stack Web Developer', 80961, 2);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('Senior Accountant', 73629, 3);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('Sales Manager', 78500, 4);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('CEO', 146707, 5);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('Software Developer Manager', 140952, 6);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('Sales Associate', 38005, 4);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('Social Media Manager', 54549, 6);
INSERT INTO Job_Title (title, salary, department_id) 
VALUES ('Junior Graphic Designer', 52125, 6);

-- THIRD TABLE: Displaying each employee's full name, their role in the company and relation to any manager
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Jeff', 'Bezos',5, NULL);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Vijithiran', 'Navajeevayokan', 2, 1);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Ali', 'Maqsood', 6, NULL);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Lebron', 'James', 4, NULL);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Micheal', 'Jordan', 6, 3);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Magic', 'Johnson', 2, 5);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Charles', 'Barkley', 1, NULL);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Kobe', 'Bryant', 3, NULL);
INSERT INTO Person (first_name, last_name, role_id, manager_id)
VALUES ('Steve', 'Jobs', 3, NULL);
