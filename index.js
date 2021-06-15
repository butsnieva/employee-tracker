const inquirer = require('inquirer')
const consoleTable = require('console.table')
const db = require('./db/connections')

// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const menu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuList',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }
    ]).then(({ menuList }) => {
        switch (menuList) {
            case 'View all departments':
                allDepartments()
                break
            case 'View all roles':
                allRoles()
                break
            case 'View all employees':
                allEmployees()
                break
            case "Add a department":
                addDepartment()
                break
            case "Add a role":
                addRole()
                break
            case "Add an employee":
                addEmployee()
                break
            case "Update an employee role":
                updateEmployeeRole()
                break
            case "Exit":
                console.log("Goodbye");
                db.end();
                break;
        }
    })
}


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
allDepartments = () => {
    let q = 'SELECT* FROM department'
    db.query(q, (err, rep) => {
        if (err) throw err
        console.log("\n")
        console.table('DEPARTMENTS', rep)
        menu()
})}


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
allRoles = () => {
    let q = `SELECT r.id, r.title, r.salary, d.name AS department 
                FROM role AS r
                LEFT JOIN department AS d ON (d.id = r.department_id)
                ORDER BY r.id;`
    db.query(q, (err, rep) => {
        if (err) throw err
        console.log("\n")
        console.table('ROLES', rep)
        menu()
})}


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
allEmployees = () => {
    let q = `SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary,
                CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                FROM employee AS e
                LEFT JOIN employee manager on manager.id = e.manager_id
                INNER JOIN role AS r ON (r.id = e.role_id)
                INNER JOIN department AS d ON (d.id = r.department_id)
                ORDER BY e.id;`
    db.query(q, (err, rep) => {
        if (err) throw err
        console.log("\n")
        console.table('EMPLOYEES', rep)
        menu()
})}


// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
addDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            message: 'Enter a department name:',
            name: 'new_department',
        }).then((input) => {
            let q = `INSERT INTO department SET ?;`
            db.query(q, {name: input.new_department},
                (err) => {
                if (err) throw err
                })
            console.table('\nDepartment "'+ JSON.stringify(input.new_department) +'" has been added.\n')
            menu()
})}




// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Enter a role title:',
                name: 'new_role'
            },
            {
                type: 'number',
                message: 'Salary:',
                name: 'new_salary',
            } 
        ]).then(input => {
            const params = [input.new_role, input.new_salary]
            let q = `SELECT name, id FROM department;`
            db.query(q, (err, data) => {
                if (err) throw err
                const listOfDepartments = data.map(({ name, id }) => ({ name: name, value: id }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'new_department',
                        message: 'Choose a department for the '+ input.new_role +' role:',
                        choices: listOfDepartments
                    }
                ]).then(selectedDpt => {
                        const department = selectedDpt.new_department
                        params.push(department)
                        console.log(params)
                        let q = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`
                        db.query(q, params, (err) => {
                            if (err) throw err
                            console.log('\nNew role ' + JSON.stringify(input.new_role) + ' has been added.\n')
                            menu()
                    })})
        })})
}



// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
addEmployee = () => {
    db.query(`SELECT * FROM role;`, (err, record) => {
        if (err) throw err
        const roles = record.map((role) => ({
            value: role.id,
            name: role.title,
        }))
        db.query(`SELECT * FROM employee;`, (err, record) => {
            if (err) throw err
            const managers = record.map((employee) => ({
                value: employee.id,
                name: employee.first_name + ' ' + employee.last_name 
            }))
            managers.push({ name: "None", value: null })

            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'Enter employee first name:',
                        name: 'first_name'
                    },
                    {
                        type: 'input',
                        message: 'Enter employee last name:',
                        name: 'last_name'
                    },
                    {
                        type: 'list',
                        message: 'Select employee role:',
                        name: 'role_id',
                        choices: roles
                    },
                    {
                        type: 'list',
                        message: 'Select employee manager:',
                        name: 'manager_id',
                        choices: managers
                    }
                ]).then(function (input) {
                    db.query(`INSERT INTO employee SET ?;`, input,(err) => {
                            if (err) {throw err}
                            console.log('\nEmployee ' + input.first_name + " " + input.last_name + 'has been added.\n')
                            menu()
                    })})
        })
})}



// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 





module.exports = { menu }