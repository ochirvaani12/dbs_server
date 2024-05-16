const express = require('express')
const cors = require('cors')
require('dotenv/config')

// IMPORTING ROUTES
const auth = require('./app/route/auth')
const task = require('./app/route/task')

// CREATING APPLICATION
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ROUTES
app.use(auth)
app.use(task)
app.get('/', (req, res) => {
    res.send('Hello!')
})

// LISTENING SERVER
app.listen(8080, () => {
    console.log('Server is running on 8080 port')
})

// CREATING DATABASE CONNECTION
const { sequelize, Staff, Login, ClientStaff, ClientCompany, Project } = require("./app/db");
const { createTaskViewQuery } = require('./app/db/migration')
sequelize.sync({ force: true })
    .then(async () => {
        console.log("Synced db.");

        await ClientCompany.create({ id: 1, name: 'BSB'})
        await Project.create({id: 1, name: 'ERP system', company_id: 1, description: 'Байгуулгын дотоодын ERP систем'})

        await Staff.create({ id: 1, firstname: 'Jane', lastname: 'Bob', position: 'DEVELOPER'})
        await ClientStaff.create({ id: 1, name: 'Richard', company_id: 1})

        await Login.create({ staff_id: 1, staff_type: 'CLIENT', username: 'client', password: '1234' });
        await Login.create({ staff_id: 1, staff_type: 'STAFF', username: 'staff', password: '1234' });

    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });