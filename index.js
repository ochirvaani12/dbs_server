const express = require('express')
const cors = require('cors')
require('dotenv/config')

// CREATING APPLICATION
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// CREATING DATABASE CONNECTION
const { sequelize } = require("./app/db");
sequelize.sync({ force: true })
    .then(() => {
        console.log("Synced db.");

        const createTaskViewQuery = `
        create or replace view vw_task as
        select 
            t.id,
            c.id as company_id,
            c.name as company_name,
            t.proj_id,
            p.name as proj_name,
            p.description as proj_desc,
            t.client_staff_id,
            cs.name as client_staff_name,
            t.staff_id,
            s.firstname as staff_firstname,
            s.lastname as staff_lastname,
            s.position as staff_position,
            t.status,
            t.subject,
            t.type,
            t.priority,
            t.position,
            t.due_date,
            t.created_at,
            t.finished_at
        from task t
        left join project p on p.id = t.proj_id
        left join staff s on s.id = t.staff_id
        left join client_staff cs on cs.id = t.client_staff_id
        left join client_company c on c.id = cs.company_id
        `;

        sequelize.query(createTaskViewQuery, { raw: true }).then(() => {
            console.log('View created successfully');
        }).catch((err) => {
            console.error('Failed to create view:', err);
        });
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


// ROUTES
app.get('/', (req, res) => {
    res.send('Hello!')
})

// LISTENING SERVER
app.listen(8080, () => {
    console.log('Server is running on 8080 port')
})

