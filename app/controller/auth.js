const jwt = require('jsonwebtoken')
const { Login } = require('../db')
require('dotenv/config')

module.exports.login = async function (req, res) {
    const login = await Login.findOne({ where: { username: req.body.username } });
    if (login) {
        if (req.body.password == login.password) {
            let token = jwt.sign({
                id: login.staff_id,
                type: login.staff_type,
            }, process.env.JWT_KEY)
            res.json({ success: true, data: { token: token, id: login.staff_id, type: login.staff_type } })
        }
        else res.json({ success: false, data: { message: 'password or username is wrong' } })
    } else res.json({ success: false, data: { message: 'password or username is wrong' } })
}
