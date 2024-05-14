const { VwTask } = require('../db')

module.exports.task = async function (req, res) {
    const task = null;
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
