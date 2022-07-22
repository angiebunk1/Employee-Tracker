USE employee_db;
INSERT INTO department (name) VALUES 
("HR"),
("FINANCE"),
("IT");

INSERT INTO role (title, salary, department_id) VALUES
("Administrative Assistant", 70000, 1),
("Finance Manager", 150000, 2),
("Database Manager", 90000, 3),
("IT intern", 50000, 3),
("HR Director", 120000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Fred", "Jones", 2, NULL),
("Scott", "Truman", 3, NULL),
("Susan", "Smith", 4, 2),
("Mary", "Troyer", 5, NULL),
("Jake", "Harper", 1, 4);