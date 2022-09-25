const inquirer = require('inquirer');

const start = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'toDo',
            message: 'What would you like to do?',
            choices: [
                "View All Departments",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Employees",
                "Add Department",
            ]
        }
    ])
    .then(answers => {
        const newQuestion = answers.toDo;
        if (newQuestion === "View All Departments") {
            viewDepartments();
        };

        if (newQuestion === "Add Employee") {
            addEmployee();
        };

        if (newQuestion === "Update Employee Role") {
            updateRole();
        };

        if (newQuestion === "View All Roles") {
            viewRoles();
        };

        if (newQuestion === "Add Role") {
            addRole();
        };

        if (newQuestion === "View All Employees") {
            viewEmployees();
        };

        if (newQuestion === "Add Department") {
            addDepartment();
        };
    })

// VIEW ALL THE DEPARTMENTS
const viewDepartments = () => {
    const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
        console.log("\n");
        console.table(rows);
        return start();
      });
    };

// VIEW ALL THE ROLES 
const viewRoles = () => {
    const sql = `SELECT roles.id
                        roles.title
                        roles.salary
                        departments.department_name AS department
                 FROM roles 
                 LEFT JOIN departments ON roles.department_id = departments.id`;
                 db.query(sql, (err, rows) => {
                    if (err) {
                      throw err;
                    }
                    console.log("\n");
                    console.table(rows);
                    return start();
                  });
                };
}

// VIEW ALL THE EMPLOYEES
const viewEmployees = () => {
    const sql = `SELECT employees.id,
                        employee.first_name,
                        employee.last_name,
                        roles.title AS title,
                        departments.department_name AS department,
                        CONCAT (manager.first_name, " ", manager.last_name) AS manager
                FROM employees 
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees ON employees.manager_id = manager.id;`
                db.query(sql, (err, rows) => {
                    if (err) {
                    throw err;
                    }
                    console.log("\n");
                    console.table(rows);
                    return start();
                });
                };

// ADD EMPLOYEE
const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?"

        },

        {
            type: "input",
            name: "lastName",
            message: "What is the new employee's last name?"
        },
    ])
    .then (answer => {
        const params = [answer.firstName , answer.lastName];
        const sql = `SELECT * FROM roles`
        db.query(sql, (err, rows) => {
            if (err) {
              throw err;
            }
    return inquirer.prompt ([ 
        {
            type: "list",
            name: "employeeRole",
            message: "What is the role of this new employee?",
            choices: roles
        },
    ])
    .then (roleAnswer => {
        const role = roleAnswer.role;
        params.push(role);
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
            if (err) {
              throw err;
            }
    return inquirer.prompt ([ 
        {
            type: "list",
            name: "manager",
            message: "What is the role of this new employee?",
            choices: roles
        },
    ])
    .then(managerAnswer => {
        const manager = managerAnswer.manager;
        params.push(manager);
        const sql = `INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, params, (err) => {
          if (err) {
            throw err;
          }
          console.log("Employee added!");
          return viewEmployees();
        });
    });
});
});
});
});
};

// UPDATE EMPLOYEE
const updateRole = () => {
    const sql = `SELECT first_name, last_name, id FROM employees`
    db.query(sql, (err, rows) => {
        if (err) {
          throw err;
        }
    inquirer.prompt([
        {
            type: "list",
            name: "employee",
            message: "Which employee's role would you like to update?",
            choices: employees
            }
          ])
    .then(employeeAnswer => {
        const employee = employeeAnswer.employee;
        const params = [employee];
        const sql = `SELECT title, id FROM roles`;
        db.query(sql, (err, rows) => {
            if (err) {
            throw err;
        }
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the new role of the employee?",
            choices: roles
            }
          ])
    .then(rolesAnswer => {
        const role = rolesAnswer.role;
        params.unshift(role);
        const sql = `UPDATE employees
                     SET role_id = ?
                     WHERE id = ?`
        db.query(sql, params, (err) => {
            if (err) {
                throw err;
              }
              console.log("Employee updated!");
              return viewEmployees();
            });
          });
        });
      });
    });
  };

// 














