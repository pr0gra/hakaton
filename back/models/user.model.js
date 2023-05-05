module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
        },
        surname: {
            type: Sequelize.STRING,
        },
        patronymic: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
            unique: true
        },
        dateOfBorn: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        tglink: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: true
    })

    return User;
}