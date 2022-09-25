INSERT INTO departments (id, department_name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");


INSERT INTO roles (id, title, salary, department_id)
VALUES  ("Lead Engineer" , 150000 , 1),
        ("Software Engineer" , 120000 , 1),
        ("Account Manager" , 160000 , 2),
        ("Accountant" , 125000 , 2),
        ("Legal Team Lead" , 250000 , 3),
        ("Lawyer" , 190000 , 3),
        ("Sales Lead" , 100000 , 4),
        ("Salesperson" , 80000 , 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  ("Billy" , "Bob" , 1 , null),
        ("Karen" , "Mean" , 2 , 1),
        ("Sally" , "Mae" , 3 , null),
        ("Stewart" , "Little" , 4 , 3),
        ("Matt" , "Murdock" , 5 , null),
        ("Jennifer" , "Walters" , 6 , 5),
        ("Mike" , "Chan" , 7 , null),
        ("Tim" , "Allen" , 8 , 7);