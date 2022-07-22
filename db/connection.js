const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    database: 'employee_db'
    // Port?
},
console.log("Connected to employee database")
);

module.exports = db;