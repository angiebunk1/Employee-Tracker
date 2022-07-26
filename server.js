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

const displayRoles = () => {
    const sql = "SELECT * FROM role";

    db.query(sql, (err, rows) => {
       if (err) {
         console.table(err);
       }
       console.table(rows)
   })   
    
}

//display employees

const displayEmps = () => {
    const sql = "SELECT * FROM employee";

    db.query(sql, (err, rows) => {
       if (err) {
         console.table(err);
       }
       console.table(rows)
   })   
    
}

// add Department

const addDept = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'newDept',
        message: 'What is the name of the department you want to add?'
    }])
    .then((response) => {
    const sql = "INSERT INTO department (name) VALUES (?)";

    db.query(sql, response.newDept, (err, result) => {
           if (err) {
             console.table(err);
           }
           console.table(result)
       })   
    })
};    


 // add role 

const addRole = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'newRole',
        message: 'What is the name of the role you want to add?'
    },
    {
        type: 'number',
        name: 'newSalary',
        message: 'What is the salary for this role?',
    },
    {
        type: 'list',
        name: 'chooseDept',
        message: 'What department is this role assigned to?',
        choices: [
            1,
            2,
            3
        ]
    }])
    .then((response) => {
    const sql = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
    const newValues = [response.newRole, response.newSalary, response.chooseDept];

    db.query(sql, newValues, (err, result) => {
           if (err) {
                console.table(err);
           }
           console.table(result)
       })   
   })
};



// add employee

const addEmp = () => {
    inquirer.prompt([
        {
        type: 'input',
        name: 'newFirst',
        message: 'What is the first name of the employee?'
    },
    {
        type: 'input',
        name: 'newLast',
        message: 'What is the last name of the employee?',
    },
    {
        type: 'list',
        name: 'chooseRole',
        message: 'Which role is the employee assigned to?',
        choices: [
            1,
            2,
            3,
            4
        ]
    },
    {
        type: 'list',
        name: 'chooseManager',
        message: 'Which manager is the employee working under?',
        choices: [
            1,
            2
        ]
    }
])
    .then((response) => {
    const sql = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    const empValues = [response.newFirst, response.newLast, response.chooseRole, response.chooseManager];

    db.query(sql, empValues, (err, result) => {
           if (err) {
                console.table(err);
           }
           console.table(result)
       })   
   })
};

// update employee

const updateEmp = () => {
    inquirer.prompt([
    {
        type: 'list',
        name: 'chooseEmp',
        message: 'What is the id of the employee you want to update?',
        choices: [
            1,
            2,
            3,
            4
        ]
    },
    {
        type: 'list',
        name: 'newRole',
        message: 'Which role do you want to change them to?',
        choices: [
            1,
            2,
            3,
            4
        ]
    }
])
.then((response) => {
    const sql = "UPDATE employee SET role_id = ? WHERE id = ?";
    const newValues = [response.newRole, response.chooseEmp];

    db.query(sql, newValues, (err, result) => {
           if (err) {
                console.table(err);
           }
           console.table(result)
       })   
   })
    
};

initialPrompt();