module.exports = (sequelize, Sequelize) => {
    const Requests = sequelize.define("requests", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userid: {
            type: Sequelize.INTEGER
        },
        teamid: {
            type: Sequelize.INTEGER
        },
        leaderid: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: true
    })

    return Requests
}