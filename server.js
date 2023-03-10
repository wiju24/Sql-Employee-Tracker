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
// ---------- READ ---------- //

// VIEW all departments
function showDepartment() {
    let sql = `SELECT * FROM 
    employee_db.department;`;
    connection.query(sql, function(error, results) {
        if(error) {
            console.log(error);
        }
        console.table(results);
        chooseCategory();
    })
}
// VIEW all Job_Titles
function showRole() {
    let sql = `SELECT Job_Title.id,
	Job_Title.title,
	department.department AS department,
	Job_Title.salary
    FROM Job_Title
	INNER JOIN department ON Job_Title.department_id = department.id;`
    connection.query(sql, function(error, results) {
        if(error) {
            console.log(error);
        }
        console.table(results);
        chooseCategory();
    })
}
// VIEW all Employees (Persons)
function showEmployees() {
    let sql = `SELECT Person.id,
    Person.first_name,
    Person.last_name,
    Job_Title.title,
    department.department AS department,
    Job_Title.salary,
	CONCAT(manager.first_name, " ", manager.last_name) AS managerName
    FROM Person
    LEFT JOIN Job_Title on Job_Title.id = Person.id
    LEFT JOIN department ON department.id = Job_Title.department_id
    LEFT JOIN Person AS manager ON manager.id = Person.manager_id;`
    connection.query(sql, function(error, results) {
        if(error) {
            console.log(error);
        }
        console.table(results);
        chooseCategory();
    })
}
// ---------- CREATE ---------- //

// Add department
function addDepartment() {
    return inquirer.prompt([{
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?",
        validate: valiDepartment => {
            if (valiDepartment) {
                return true;
            } else {
                return 'Please enter a name for the new department';
            }
        }
    }])
       .then(answers => {
            let sql = `INSERT INTO department (department) VALUES (?)`;
            let newDepartment = [answers.newDepartment];
            connection.query(sql, newDepartment, function(error, results) {
                if(error) {
                    console.log(error);
                } else {
                    console.table(results);
                }
                chooseCategory();
            })
        })
}

// Add Employee (Person)
function addEmployee () {
    return inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "What is the First Name of the new employee being added?",
        validate: valiFirstName => {
            if (valiFirstName) {
                return true;
            } else {
                return 'Please enter the First name for the newly recruited employee.';
            }
        }
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the Last Name of the new employee being added?",
        validate: valiLastName => {
            if (valiLastName) {
                return true;
            } else {
                return 'Please enter the Last name for the newly recruited employee.';
            }
        }
    },
    {
        type: "input",
        name: "jobTitleId",
        message: "What is the Job Title ID of the new employee being added?",
        validate: valijobTitleId => {
            if (valijobTitleId) {
                return true;
            } else {
                return 'Please enter a valid Job Title ID of the new employee being added.';
            }
        },
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the Manager ID of the new employee that will be working under the manager?",
        validate: valiManagerId => {
            if (valiManagerId) {
                return true;
            } else {
                return 'Please enter a valid Manager ID of the new employee being added.';
            }
        },
    }
    ])
      .then(answers => {
          let sql = `INSERT INTO Person (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
          let newEmployee = [answers.firstName, answers.lastName, answers.jobTitleId, answers.managerId];

          connection.query(sql, newEmployee, function(error, results) {
              if(error) {
                  console.log(error);
              } else {
                  console.table(results);
              }
              chooseCategory();
          })
      })
}

// Add Role (Job_Title)
function addRole () {
    return inquirer.prompt([{
        type: "input",
        name: "title",
        message: "What is the title of the position?",
        validate: valiRole => {
            if (valiRole) {
                return true;
            } else {
                return 'Please enter a valid Job Description for the Employee.';
            }
        }
    },
    {
        type: "input",
        name: "salary",
        message: "What will be the starting salary for the new employee?",
        validate: valiSalary => {
            if (valiSalary) {
                return true;
            } else {
                return 'Please enter a valid salary for the employee.';
            }
        },
    },
    {
        type: "input",
        name: "departId",
        message: "What will be the ID of the department that the employee is joining? The number next to each department will be the id to input for the employee to join. 1) Human Resources 2) Information Technology 3) Accounting 4) Sales 5) Management 6) Social Media ",
        validate: valiDepartID => {
            if (valiDepartID) {
                return true;
            } else {
                return 'Please enter a department ID for the employee hat is under the department.';
            }
        },
    }])
      .then(answers => {
          let sql = `INSERT INTO Job_Title (title, salary, department_id) VALUES (?,?,?);`;
          let newRole = [answers.title, answers.salary, answers.departId];

          connection.query(sql, newRole, function(error, results) {
              if(error) {
                  console.log(error);
              } else {
                  console.table(results);
              }
              chooseCategory();
          })
      })
}
// ---------- UPDATE ---------- //

function updateEmployeeInfo () {
    return inquirer.prompt([{
        type: "input",
        name: "updateFirstName",
        message: "What is the first name of the updated employee?",
        validate: valiNewInfoFirstName => {
            if (valiNewInfoFirstName) {
                return true;
            } else {    
                return 'Enter the First Name of the employee being updated in the database.';
            }
        }
    },
    {
        type: "input",
        name: "updateLastName",
        message: "What is the last name of the updated employee?",
        validate: valiNewInfoLastName => {
            if (valiNewInfoLastName) {
                return true;
            } else {    
                return 'Enter the Last Name of the employee being updated in the database.';
            }
        }
    },
    {
        type: "input",
        name: "updateRoleId",
        message: "What is the role id of the updated employee?",
        validate: valiNewInfoRoleId => {
            if (valiNewInfoRoleId) {
                return true;
            } else {    
                return 'Please update the role.Id of the employee recently updated/added.';
            }
        }
    },
    {
        type: "input",
        name: "updateManagerId",
        message: "Who is the updated employee working under?",
        validate: valiNewInfoManagerId => {
            if (valiNewInfoManagerId) {
                return true;
            } else {    
                return 'Please enter a valid manager for the updated employee.';
            }
        }
    },
    ])
     .then(answers => {
        let sql = `UPDATE Person SET updateRoleId =? WHERE updateFirstName =? AND updateLastName =? AND updateRoleId =? AND updateManagerId =?`;
        let updateEmployee = [
            answers.updateRoleId,
            answers.updateFirstName,
            answers.updateLastName,
            answers.updateManagerId,
        ];

        connection.query(sql, updateEmployee, function(error, results) {
            if(error) {
                console.log(error);
            } else {
                console.table(results);
            }
            chooseCategory();
        })
    })
}



chooseCategory();