const express = require('express');
const router = express.Router()

const controller = require('../controllers/team.controller')
const middleware = require('../middelware/verifySignUp')
const authMiddleware = require('../middelware/authJwt')

router.post('/createteam', [
    authMiddleware.verifyToken
], controller.createTeam)
router.get('/getteams', controller.getTeams);

router.post('/getTeam', [
    authMiddleware.verifyToken,
    authMiddleware.isAdmin
], controller.getTeam)

router.post('/jointoteam', [
    authMiddleware.verifyToken
], controller.joinToTeam)

router.post('/getmyrequests', [
    authMiddleware.verifyToken
], controller.getMyRequests)

router.post('/attachusertoteam', [
    authMiddleware.verifyToken
], controller.attachUserToTeam)

router.post('/getmyteam', [
    authMiddleware.verifyToken
], controller.getMyTeam)

router.post('/leaveFromTeam', [
    authMiddleware.verifyToken
], controller.leaveFromCommand)

router.post('/deleteTeam', [
    authMiddleware.verifyToken
], controller.deleteTeam)

router.post('/excludeMember', [
    authMiddleware.verifyToken
], controller.excludeMember)

module.exports = router;