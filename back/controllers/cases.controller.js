const db = require('../models/index')
const Case = db.case;

exports.getCases = async (req, res) => {
    try {
        const cases = await Case.findAll();
        const result = []
        cases.map(item => {
            return result.push(item.dataValues)
        })

        return res.status(200).send({
            message: "Успех",
            cases: result
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}