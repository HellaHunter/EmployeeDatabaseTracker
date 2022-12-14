const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: 'employee_db'
    },
    console.log("Connected to the employee_db database.")
);

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

        })
};

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'main_question',
                message: prompts[0],
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
            }
        ])
        .then((response) => {
            if(response.main_question === 'View all departments') {

            } else if(response.main_question === 'View all roles') {

            } else if(response.main_question === 'View all employees') {

            } else if(response.main_question === 'Add a department') {
                addDepartment();
            } else if(response.main_question === 'Add a role') {
                addRole();
            } else if(response.main_question === 'Add an employee') {
                addEmployee();
            } else {
                updateEmployeeRole();
            }
        })
};

startApp();