const express = require('express')
const router = express.Router()
const task = require('../controller/task')
const auth = require('../controller/checkToken')

router.post('/task', auth.checkToken, task.task)
router.post('/createTask', auth.checkToken, task.createTask)
router.post('/updateTask', auth.checkToken, task.updateTask)

module.exports = router