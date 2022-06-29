const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'classlist_db',
  }
);

db.connect(function (err) {
    if (err) throw err;
    init();
});

const allEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) return console.error(err);
        console.table(results);
        init();
    });
}

const allRoles = () => {
 db.query('SELECT * FROM role', function (err, results) {
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