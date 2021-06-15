INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000,4);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, null),
('Ashley', 'Rodrigez', 3, null),
('Mike', 'Chan', 6, null),
('Kevin', 'Tupik', 2, 1),
('Malia', 'Brown', 4, 2),
('Sarah', 'Lourd', 5, null),
('Christian', 'Eckenrode', 7, 3), 
('Tom', 'Allen', 4, 2);