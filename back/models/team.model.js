module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define("team", {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        description: {
            type: Sequelize.STRING
        },
        caseid: {
            type: Sequelize.INTEGER
        },
        linkToChat: {
            type: Sequelize.STRING
        },
        leaderid: {
            type: Sequelize.INTEGER
        },
        maxMembers: {
            type: Sequelize.INTEGER
        },
        // mode: {

        // }
    }, {
        timestamps: true
    })

    return Team
}