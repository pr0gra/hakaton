const express = require('express');
const router = express.Router()

const controller = require('../controllers/cases.controller')
const middleware = require('../middelware/verifySignUp')
const authMiddleware = require('../middelware/authJwt')

router.post('/getcases', [
    authMiddleware.verifyToken
], controller.getCases)

module.exports = router;