const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "employees_db",
});

// db.connect(function (err) {
//     if (err) throw err;
//     init();
// });

// const allEmployees = () => {
//     db.query('SELECT employee_info.id, employee_info.first_name, employee_info.last_name, employee_role.title, department.name AS department, employee_role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee_info LEFT JOIN employee_role ON employee_info.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id', function (err, results) {
//         if (err) return console.error(err);
//         console.table(results);
//         init();
//     });
// }
const allEmployees = () => {
    db.query("SELECT  employee_info.id, employee_info.first_name, employee_info.last_name, employee_role.title, employee_role.salary, department.department_name, employee_info.manager_id FROM employee_info LEFT JOIN employee_role ON employee_info.role_id=employee_role.id LEFT JOIN department ON employee_role.department_id=department.id", function (err, result, fields) {
        console.table(result);
            init();
    });
}

const allRoles = () => {
    db.query('SELECT employee_role.id, employee_role.title, department.department_name AS department, employee_role.salary FROM employee_role LEFT JOIN department ON employee_role.department_id=department.id', function (err, results) {
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

const addRole = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) return console.error(err);
        const deptChoices = results.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of role you would like to add?'
            },
            {
                type: 'list',
                name: 'roleDeptId',
                message: 'What is the department name?',
                choices: deptChoices
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?'
            }
        ]).then(function (answer) {
            db.query("INSERT INTO employee_role (title, department_id, salary) VALUES (?,?,?)", [answer.roleName, answer.roleDeptId, answer.roleSalary], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            });
        });
    });
}

const addEmployee = () => {
    db.query('SELECT employee_info.id, CONCAT(employee_info.first_name, " ", employee_info.last_name) AS employee_info, employee_role.title, department.department_name AS department, employee_role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee_info LEFT JOIN employee_role ON employee_info.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id LEFT JOIN employee_info manager ON manager.id = employee_info.manager_id', function (err, res) {
        if (err) return console.error(err);
        const employeeChoices = res.map(({ id, employee_info }) => ({
            name: employee_info,
            value: id
        })).filter(e => e);
        db.query('SELECT employee_role.id, employee_role.title, department.department_name AS department, employee_role.salary FROM employee_role LEFT JOIN department ON employee_role.department_id=department.id', function (err, results) {
            if (err) return console.error(err);
            console.table(results);
            const roleChoices = results.map(({ id, title }) => ({
                name: title,
                value: id
            }));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'employeeFirstName',
                    message: 'What is the first name of the employee you would like to add?'
                },
                {
                    type: 'input',
                    name: 'employeeLastName',
                    message: 'What is the last name of the employee?'
                },
                {
                    type: 'list',
                    name: 'employeeRoleId',
                    message: 'What is the role of the employee?',
                    choices: roleChoices
                },
                {
                    type: 'list',
                    name: 'employeeManagerId',
                    message: 'Who is the manager of the employee?',
                    choices:
                        employeeChoices.concat({ name: 'No Manager', value: null }),
                }
            ]).then(function (answer) {
                db.query("INSERT INTO employee_info (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [answer.employeeFirstName, answer.employeeLastName, answer.employeeRoleId, answer.employeeManagerId], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    init();
                });
            });
        });
    });
}

const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department you would like to add?'
    }]).then(function (answer) {
        db.query('INSERT INTO department (department_name) VALUES (?)', [answer.departmentName], function (err, res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    });
}

const init = () => {
    const choices = [
        'View All Employees',
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Exit',
    ];

    inquirer.prompt([
        {
            type: 'rawlist',
            name: 'query',
            message: 'What what you like to do?',
            choices,
        }

    ]).then(data => {
        if (data.query === 'View All Employees') { allEmployees(); }
        if (data.query === 'Add Employee') { addEmployee(); }
        if (data.query === "Update Employee Role") { updateRole(); }
        if (data.query === "View All Roles") { allRoles(); }
        if (data.query === "Add Role") { addRole(); }
        if (data.query === "View All Departments") { allDepartments(); }
        if (data.query === "Add Department") { addDepartment(); }
        if (data.query === "Exit") { db.end(); }
    })
};
init();