const express = require('express')
const router = express.Router()
const task = require('../controller/task')
const auth = require('../controller/checkToken')

router.post('/task', auth.checkToken, task.task)

module.exports = router