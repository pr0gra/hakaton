const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

const db = require('../models/index')
const User = db.user;
const Role = db.role;

const bcrypt = require('bcryptjs')

const {
    generateTokens,
    validateRefreshToken,
    saveToken,
    logout
} = require('../services/authService')

exports.createAdminAccount = async (adminData) => {
    try {
        const user = await User.create({
            name: adminData.name,
            surname: adminData.surname,
            patronymic: adminData.patronymic,
            phone: adminData.phone,
            dateOfBorn: adminData.dateOfBorn,
            email: adminData.email,
            tglink: adminData.tglink,
            password: bcrypt.hashSync(adminData.password, 8)
        })

        const roles = await Role.findAll()
        const result = user.setRoles(roles[1])

        const userData = {
            id: user.dataValues.id,
            email: user.dataValues.email,
            createdAt: user.dataValues.createdAt
        }
        const userTokens = generateTokens(userData);
        saveToken(user.dataValues.id, userTokens.refreshToken)
    } catch (error) {
        return console.log(error)
    }
}