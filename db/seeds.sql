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
('Lawyer', 190000,2);

INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, 6),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodrigez', 3, null),
('Kevin', 'Tupik', 4, 1),
('Malia', 'Brown', 5, null),
('Sarah', 'Lourd', 6, null),
('Christian', 'Eckenrode', 7, 3), 
('Tom', 'Allen', 4, null);