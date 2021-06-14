const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootpass',
    database: 'employee_tracker'
},
console.log('Connected to the database.')
)

module.exports = db