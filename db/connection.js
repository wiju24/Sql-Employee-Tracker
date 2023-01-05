const mysql = require('mysql2');

// database config
const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "employee_db"
});

module.exports = connection;