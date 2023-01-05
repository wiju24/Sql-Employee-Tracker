const inquirer = require('inquirer');
const mysql = require('mysql2');
const displayTable = require('console.table');

require('dotenv').config()

// database config
const connection = mysql.createConnection({
    host: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
    
});

connection.connect(function(err){
if(err)throw err;    
})



const chooseCategory =async  () => {
   const answers= await inquirer.prompt([
        {
            type: "list",
            name: "chooseCategory",
            message: "Please choose what category you wish to view!",
            choices: [
                'Show all Departments', 'Show all Roles', 'Show all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Status', 'Exit'
            ],
        },
    ])

        if (answers.chooseCategory === 'Show all Departments') {
            showDepartment();
        } else if (answers.chooseCategory === 'Show all Roles') {
            showRole();
        } else if (answers.chooseCategory === 'Show all Employees') {
            showEmployees();
        } else if (answers.chooseCategory === 'Add a Department') {
            addDepartment();
        } else if (answers.chooseCategory === 'Add a Role') {
            addRole();
        } else if (answers.chooseCategory === 'Add an Employee') {
            addEmployee();
        } else if (answers.chooseCategory === 'Update Employee Status') {
            updateEmployeeInfo();
        } else if (answers.chooseCategory === 'Exit') {
            process.exit();
        }
  
}