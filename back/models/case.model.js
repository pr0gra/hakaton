module.exports = (sequelize, Sequelize) => {
    const Case = sequelize.define("case", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })

    return Case
}