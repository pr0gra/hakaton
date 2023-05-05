module.exports = (sequelize, Sequelize) => {
    const Userteam = sequelize.define("user_team", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    }, {
        timestamps: false
    })

    return Userteam;
}