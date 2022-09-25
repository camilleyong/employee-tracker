-- ROLES
SELECT roles.id,
       roles.title,
       roles.salary,
       departments.department_name AS department
FROM roles 
LEFT JOIN departments ON roles.department_id = departments.id;

-- EMPLOYEES
SELECT employees.id,
       employee.first_name,
       employee.last_name,
       roles.title AS title,
       departments.department_name AS department,
       CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employees 
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees ON employees.manager_id = manager.id;

