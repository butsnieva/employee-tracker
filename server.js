const express = require ('express')
const db = require('./db/connections')

const PORT = process.env.PORT || 3001
const app = express()


app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use((req, res) => {
    res.status(404).end()
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    })


db.connect(err => {
    if (err) throw err
    console.log(`
     -----------------------
    |   EMPLOYEE MANAGER    |
     -----------------------`)
    })