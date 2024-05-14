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
const { sequelize } = require("./app/db");
const { createTaskViewQuery } = require('./app/db/migration')
sequelize.sync({ force: false })
    .then(() => {
        console.log("Synced db.");

        sequelize.query(createTaskViewQuery, { raw: true }).then(() => {
            console.log('View created successfully');
        }).catch((err) => {
            console.error('Failed to create view:', err);
        });
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });