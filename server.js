const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const process = require("process");
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Using mysql12 to connect to the database we are using

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'employee_db'
    },
    console.log("Connected to the employee_db database.")
);

// A list of questions that will be used with inquirer

const prompts = [
    "Welcome! What Would you like to do?",
    "What is the name of the department you would like to add?",
    "What is the name of the role you would like to add?",
    "What department does this role belong too?",
    "What is the salary of this new role?",
    "What is the new employee's first name?",
    "What is the new employee's last name?",
    "What role is this employee filling?",
    "Who is the manager of this new employee?",
];

// Inquirer question functions start here

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: prompts[1],
                name: 'department_name'
            }
        ])
        .then((response) => {
            updateDepartmentList();

            startApp();
        })
};

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'role_name',
                message: prompts[2]
            },
            {
                type: 'input',
                name: 'department_role',
                message: prompts[3]
            },
            {
                type: 'input',
                name: 'role_salary',
                message: prompts[4]
            }
        ])
        .then((response) => {
            updateRolesList();

            startApp();
        })
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: prompts[5]
            },
            {
                type: 'input',
                name: 'last_name',
                message: prompts[6]
            },
            {
                type: 'list',
                name: 'employee_role',
                message: prompts[7],
                choices: []
            },
            {
                type: 'list',
                name: 'employee_manager',
                message: prompts[8],
                choices: []
            }
        ])
        .then((response) => {
            let psuedoManagerID = null;
            let psuedoEmployeeID = null;

            db.promise()
                .query(`SELECT id FROM employee_db.roles WHERE title = "${response.employee_role}"`)
                .then(([rows]) => {
                    psuedoEmployeeID = rows[0].id;
                })

            db.promise()
                .query(`SELECT manager_id FROM employee_db.employee WHERE first_name = "${response.employee_manager.split(" ")[0]}" AND last_name = "${response.employee_manager.split(" ")[1]}";`)
                .then(([rows, fields]) => {
                    psuedoManagerID = rows[0].manager_id;
                })

            .then(() => {
                addNewEmployee(
                    response.first_name,
                    response.last_name,
                    psuedoManagerID,
                    psuedoEmployeeID
                );
            });

            startApp();
        })
};

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'employee_choice',
                message: 'Which employee would you like to update?',
                choices: []
            },
            {
                type: 'list',
                name: 'update_role',
                message: 'What role is this employee now filling?',
                choices: []
            }
        ])
        .then((response) => {
            changeEmployeeRole();
        })
};

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: prompts[0],
                choices: [
                    'View all departments', 
                    'View all roles', 
                    'View all employees', 
                    'Add a department', 
                    'Add a role', 
                    'Add an employee', 
                    'Update an employee role', 
                    'Exit'
                ],
                name: 'main_question'
            }
        ])
        .then((response) => {
            if(response.main_question === 'View all departments') {
                viewDepartments();
            } else if(response.main_question === 'View all roles') {
                viewRoles();
            } else if(response.main_question === 'View all employees') {
                viewEmployees();
            } else if(response.main_question === 'Add a department') {
                addDepartment();
            } else if(response.main_question === 'Add a role') {
                addRole();
            } else if(response.main_question === 'Add an employee') {
                addEmployee();
            } else if(response.main_question === 'Update an Employee Role') {
                updateEmployeeRole();
            } else {
                process.exit();
            }
        })
};

// Functions to handle responses start here

function updateDepartmentList(response) {
    db.promise()
        .query(`INSERT INTO department(department_name) VALUES ("${response}")`)
        .then(() => {
            viewDepartments();
        })
};

function updateRolesList(response) {
    db.promise()
        .query(`INSERT INTO roles(title, salary, department_id) VALUES("${response.role_name}", "${response.role_salary}", "${response.department_role}")`)
        .then(() => {
            viewRoles();
        })
};

function addNewEmployee(response) {
    db.promise()
        .query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", "${response.employee_role}", "${response.employee_manager}")`)
        .then(() => {
            viewEmployees();
        })
};

function viewDepartments() {
    db.promise()
        .query("SELECT * FROM employee_db.department")
        .then(([rows, fields]) => {
            cTable(rows)
        })
};

function viewRoles() {
    db.promise()
        .query("SELECT * FROM employee_db.roles")
        .then(([rows, fields]) => {
            cTable(rows)
        })
};

function viewEmployees() {
    db.promise()
        .query("SELECT * FROM employee_db.employee")
        .then(([rows, fields]) => {
            cTable(rows)
        })
};

function changeEmployeeRole(response) {
    db.promise()
        .query(`UPDATE employee 
        SET role_id = ${updatedRoleID}
        WHERE id = ${updatedEmployeeID}`
        )
        .then(() => {
            viewEmployees();
        })
}

startApp();