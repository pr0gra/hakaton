const express = require('express');
const router = express.Router()

const controller = require('../controllers/admin.controller')
const middleware = require('../middelware/authJwt')

router.post('/getStatistics', [
    middleware.verifyToken,
    middleware.isAdmin
], controller.getStat)

module.exports = router;