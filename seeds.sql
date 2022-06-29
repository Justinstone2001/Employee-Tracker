USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineer"),
       ("Finance"),
       ("Legal"),
    

INSERT INTO role (title, department_id, salary)
VALUES ("Sales Lead", 1, 100000),
       ("Salesman", 1, 90000),
       ("Lead Engineer", 2, 200000),
       ("Software Engineer", 2, 150000),
       ("Account Manager", 3, 180000);
       ("Accountant", 3, 120000);
       ("Legal Team Lady", 4, 120000);
       ("Lawyer", 4, 230000);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id))
VALUES ("Jessica", "Smith", 1, NULL),
       ("Hannah", "Anderson", 2, 1),
       ("Anthony", "Smart", 3, NULL),
       ("Vicky", "Pierce", 4, 3),
       ("Stewart", "Griffin", 5, NULL),
       ("Bradley", "Beal", 6, 5),
       ("Laura", "Blanch", 7, NULL);
       
