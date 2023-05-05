const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

const db = require('../models/index')
const User = db.user;

exports.verifyToken = async (req, res, next) => {
    let token = req.body.token;

    if (!token) {
        return res.status(403).send({
            message: "No token provided"
        })
    }

    jwt.verify(token, config.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            })
        }

        req.userId = decoded.id;
        next();
    })

}

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        });
        const roles = await user.getRoles();

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
                return next();
            }
        }

        return res.status(403).send({
            message: "Require Admin Role"
        })

    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate User role!",
        });
    }
}