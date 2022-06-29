const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees_db',
  }
);

db.connect(function (err) {
    if (err) throw err;
    init();
});

const allEmployees = () => {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        init();
    });
}

const allDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        init();
    });
}

const allRoles = () => {
 db.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id=department.id', function (err, results) {
     if (err) return console.error(err);
     console.table(results);
     init();
    });
}


const init = () => {
  const choices = [
    { name: 'View all departments', value: {} },
    { name: 'View all roles', value: {} },
    { name: 'View all employees', value: {} },
    { name: 'Add a department', value: {} },
    { name: 'Add a roll', value: {} },
    { name: 'Add an employee', value: {} },
    { name: 'Update employee role', value: {} },
    { name: 'Exit', value: 'exit' },
  ];

  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'query',
      message: 'What would you like to view?',
      choices,
    }
  ]).then((answers) => fn(answers.query));
  
};

init();