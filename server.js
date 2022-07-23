const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');


require('dotenv').config();

const db = 
    mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    });


const initialPrompt = () => {
    inquirer.prompt({
        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    })
    .then((response) => {
        switch (response.choices) {
            case 'View all departments':
                displayDept();
                break;
            case 'View all roles':
                displayRoles();
                break;
            case 'View all employees':
                displayEmps();
                break;
            case 'Add a department':
                addDept();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmp();
                break;
            case 'Update an employee role':
                updateEmp();
                break;
            case 'Quit':
                process.exit();
                break;
        }
    })
}

// Display departments

const displayDept = () => {
     const sql = "SELECT * FROM department";

     db.query(sql, (err, rows) => {
        if (err) {
          console.table(err);
        }
        console.table(rows)
    })   
     
}

// display roles

// const displayRoles()

// //display employees

// const dispalyEmps()

// // add Department

// const addDept()

// // add role

// const addRole()

// // add employee

// const addEmp()

// // update employee

// const updateEmp()

initialPrompt();