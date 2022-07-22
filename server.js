const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');
const Connection = require('mysql2/typings/mysql/lib/Connection');

// port? 

// app listener? 

// apis? routes? Maybe not since we're not using express? 

// should I make another file for queries?  If so, is this the same as routes or different? How do I connect them to server?

// how do we initiate the first prompt? Call it at end? 

// how do I see the database?

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
                connection.end();
                break;
        }
    })
}



