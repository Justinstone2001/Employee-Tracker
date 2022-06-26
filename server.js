const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection(
  {
    user: 'root',
    database: 'classlist_db',
  }
);

const fn = (options) => {
  if (options === 'exit') return process.exit();

  const query = 'SELECT * FROM students' + (('enrolled' in options) ? ' WHERE ?' : '');

  db.query(query, options, function (err, results) {
    if (err) return console.error(err);
    console.table(results);
    return init();
  });
};

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