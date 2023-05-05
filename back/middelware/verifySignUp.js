const db = require('../models/index')
const User = db.user;

exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {

        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (user) {
            return res.status(400).send({
                message: "Failed. Email is already is use"
            })
        }

        next()
    } catch (err) {
        return res.status(500).send({
            message: err.message + ' - middlware'
        })
    }
}