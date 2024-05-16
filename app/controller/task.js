const { Op } = require('sequelize');
const { VwTask, Task } = require('../db')

module.exports.task = async function (req, res) {
    let task = null;
    if (req.body.type == 'CLIENT') {
        task = await VwTask.findAll({ where: { client_staff_id: req.body.id } });
    } else {
        task = await VwTask.findAll({
            where: {
                [Op.or]: [
                    { staff_id: req.body.id },
                    { staff_id: null }
                ]
            }
        });
    }

    res.json({ success: true, data: { task: task } })
}

module.exports.createTask = async function (req, res) {
    const task = await Task.create({
        proj_id: req.body.projId,
        client_staff_id: req.body.id,
        subject: req.body.subject,
        status: 'NEW',
        type: req.body.type,
        priority: req.body.priority,
        position: req.body.position,
        due_date: req.body.dueDate,
        created_at: new Date()
    })

    res.json({ success: true, data: { task: task } })
}

module.exports.updateTask = async function (req, res) {
    const task = await Task.findOne({ where: { id: req.body.taskId } })

    task.staff_id = req.body.id
    task.status = req.body.status
    if(req.body.status == 'FINISHED') {
        task.finished_at = new Date()
    }
    

    res.json({ success: true, data: { task: task } })
}