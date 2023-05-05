const db = require('../models/index');
const User = db.user;
const Team = db.team;

exports.getStat = async (req, res) => {
    try {
        const users = await User.findAll()
        const teams = await Team.findAll()

        return res.status(200).send({
            message: "Статистика",
            statistic: {
                qUsers: users.length,
                qTeams: teams.length
            }
        })

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}