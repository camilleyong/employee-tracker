const inquirer = require('inquirer');
const mysql = require('mysql2');
// const table = require('console.table');
const {table} = require('table');

// connect to the sqlworkbench
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'sprite95',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  console.log(
    ` -------------------
      EMPLOYEE TRACKER
      --------------------
    `)

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
    const sql = `SELECT roles.id,
                        roles.title,
                        roles.salary,
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
    employees.first_name,
    employees.last_name,
    roles.title AS title,
    departments.department_name AS department,
    CONCAT (manager.first_name, " ", manager.last_name) AS manager
FROM employees 
LEFT JOIN roles ON employees.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees manager ON manager.id = employees.manager_id;`
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
    const roles = ["1 Lead Engineer" , "2 Software Engineer" , "3 Account Manager" , "4 Accountant" , "5 Legal Team Lead" , "6 Lawyer" , "7 Sales Lead" , "8 Salesperson"];
    const manager = ["1 Billy Bob" , "3 Sally Mae" , "5 Matt Murdock" , "7 Mike Chan"];
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
        const role2 = roleAnswer.employeeRole;
        // console.log(roleAnswer);
        params.push(getId(role2));
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
            if (err) {
              throw err;
            }
            
    return inquirer.prompt ([ 
        {
            type: "list",
            name: "manager",
            message: "Who is this employee's manager?",
            choices: manager
        },
    ])
    .then(managerAnswer => {
        const manager2 = managerAnswer.manager;
        params.push(getId(manager2));
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?)`;
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

// ADD DEPARTMENT
const addDepartment = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the new department?'

        }
    ])
    .then(answer => {
        const sql = `INSERT INTO departments (department_name)
            VALUES(?)`;
        const params = answer.department;
        db.query(sql, params, (err) => {
            if (err) {
              throw err;
            }
            console.log("Department added!");
    })
    });
}

// ADD ROLE
const addRole = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'nameRole',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this role'
        }
    ])
    .then(answer => {
        const params = [answer.nameRole , answer.salary];
        const sql = `SELECT * FROM departments`
        db.query(sql, (err, rows) => {
            if (err) {
              throw err;
            }
    inquirer.prompt ([
        {
            type: 'list',
            name: 'roleDepartments',
            message: 'What deparment does this role belong to?',
            choices: ["1 Engineering" , "2 Finance" , "3 Legal" , "4 Sales"]
        }
    ])
    .then(departmentAnswer => {
        const department2 = departmentAnswer.roleDepartments;
        params.push(getId(department2));
        const sql = `INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?)`;
        db.query(sql, params, (err) => {
          if (err) {
            throw err;
          }
          console.log("Role added!");
    });
});
});
});
};

// UPDATE EMPLOYEE
const updateRole = () => {
    const sql = `SELECT first_name, last_name, id FROM employees`
    const roles = ["1 Lead Engineer" , "2 Software Engineer" , "3 Account Manager" , "4 Accountant" , "5 Legal Team Lead" , "6 Lawyer" , "7 Sales Lead" , "8 Salesperson"];
    const employees = ["1 Billy Bob" , "2 Karen Mean" , "3 Salle Mae" , "4 Stewart Little" , "5 Matt Murdock" , "6 Jennifer Walters" , "7 Mike Chan" , "8 Tim Allen"];
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
        const employee2 = employeeAnswer.employee;
        const params = [getId(employee2)];
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
        const role2 = rolesAnswer.role;
        params.unshift(getId(role2));
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

function getId (choice){
    const choiceArray = choice.split(" ");
    return choiceArray[0];
}

module.exports = start;