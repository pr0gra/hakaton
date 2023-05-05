const db = require('../models/index')
const Team = db.team;
const User = db.user;
const UserTeam = db.userteam;
const Requests = db.requests

exports.createTeam = async (req, res) => {
    try {

        // Поиск пользователя в командах user_team
        const isMember = await UserTeam.findOne({
            where: {
                userId: req.userId
            }
        })

        if (!!isMember) {
            return res.status(401).send({
                message: "Пользователь уже состоит в команде",
            });
        }

        const team = await Team.create({
            name: req.body.name,
            description: req.body.description,
            caseid: Number(req.body.caseid),
            linkToChat: String(req.body.linkToChat),
            maxMembers: 5,
            leaderid: Number(req.userId),
        })

        const user = await User.findOne({
            where: {
                id: req.userId
            }
        })

        await Requests.destroy({
            where: {
                userid: user.dataValues.id
            }
        })

        const result = await team.addUser(user);

        if (result) return res.status(200).send({
            message: "Успех",
            team: team.dataValues
        })

    } catch (error) {
        res.status(500).send({
            message: error.message,
        })
    }
}

exports.getTeams = async (req, res) => {
    try {
        const team = await Team.findAll()

        const result = [];
        team.map(item => {
            result.push(item.dataValues)
        });

        return res.status(200).send({
            message: "Успех",
            teams: result
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getTeam = async (req, res) => {
    try {
        const { teamid } = req.body;

        const team = await Team.findOne({
            where: {
                id: teamid
            }
        })

        const members = await UserTeam.findAll({
            where: {
                teamId: team.dataValues.id
            }
        });

        const result = [];
        for (let i = 0; i < members.length; i++) {
            const user = await User.findOne({
                where: {
                    id: members[i].dataValues.userId
                }
            }).then(data => {
                delete data.dataValues.password
                let hello = {
                    ...members[i].dataValues,
                    userObject: data.dataValues
                };
                return result.push(hello)
            })
        }


        return res.status(200).send({
            message: "Успех",
            team: {
                ...team.dataValues,
                members: result
            }
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.joinToTeam = async (req, res) => {
    try {
        // Поиск пользователя в командах user_team
        const isMember = await UserTeam.findOne({
            where: {
                userId: req.userId
            }
        })

        if (!!isMember) {
            return res.status(401).send({
                message: "Пользователь уже состоит в команде",
            });
        }

        // Ожидаемые данные
        const user = await User.findOne({
            where: {
                id: req.userId
            }
        })

        const team = await Team.findOne({
            where: req.body.teamId
        })
        const user_teams = await UserTeam.findAll({
            where: {
                teamId: team.dataValues.id
            }
        })

        if (team.dataValues.maxMembers <= user_teams.length) {
            console.log("Команда заполнена")
            return res.status(500).send({
                message: "Команда заполнена"
            })
        }

        const curReq = await Requests.findOne({
            where: {
                userid: req.userId,
                teamid: team.dataValues.id
            }
        })

        if (curReq) {
            console.log("Вы ужи отправили запрос")
            return res.status(400).send({
                message: "Вы ужи отправили запрос"
            })
        }

        const result = await Requests.create({
            userid: user.dataValues.id,
            teamid: team.dataValues.id,
            leaderid: team.dataValues.leaderid
        })

        console.log(result)

        if (result) return res.status(200).send({
            message: "Успех"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getMyRequests = async (req, res) => {
    try {
        const userId = req.userId;
        const requests = await Requests.findAll({
            where: {
                leaderid: userId
            }
        })

        const result = [];
        for (let i = 0; i < requests.length; i++) {
            const user = await User.findOne({
                where: {
                    id: requests[i].dataValues.userid
                }
            }).then(data => {
                delete data.dataValues.password
                let hello = {
                    ...requests[i].dataValues,
                    userObject: data.dataValues
                };
                return result.push(hello)
            })
        }

        return res.status(200).send({
            message: "Успех",
            requests: result
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.attachUserToTeam = async (req, res) => {
    try {
        const userId = req.userId;

        const request = await Requests.findOne({
            where: {
                userid: req.body.userid
            }
        })
        if (!request) {
            return res.status(400).send({
                message: "Запрос устарел"
            })
        }

        const user = await User.findOne({
            where: {
                id: req.body.userid
            }
        })
        if (!user) {
            return res.status(400).send({
                message: "Пользователь не найден"
            })
        }

        const team = await Team.findOne({
            where: {
                id: req.body.teamid
            }
        })

        console.log(team.dataValues.leaderid == userId)
        if (team.dataValues.leaderid != userId) {
            return res.status(500).send({
                message: "Вы не явялетесь лидером данной коммады"
            })
        }

        await team.addUser(user);
        const reqresult = await Requests.destroy({
            where: {
                userid: user.dataValues.id
            }
        })

        const requests = await Requests.findAll({
            where: {
                leaderid: userId
            }
        })

        const result = [];
        for (let i = 0; i < requests.length; i++) {
            const user = await User.findOne({
                where: {
                    id: requests[i].dataValues.userid
                }
            }).then(data => {
                delete data.dataValues.password
                let hello = {
                    ...requests[i].dataValues,
                    userObject: data.dataValues
                };
                return result.push(hello)
            })
        }

        if (reqresult) return res.status(200).send({
            message: "Пользователь добавлен",
            requests: result
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.getMyTeam = async (req, res) => {
    try {
        const userId = req.userId;
        const userteam = await UserTeam.findOne({
            where: {
                userId: userId
            }
        })

        if (userteam == null) {
            return res.status(400).send({
                message: "Пользователь не состоит в комманде"
            })
        }

        const team = await Team.findOne({
            where: {
                id: userteam.dataValues.teamId
            }
        })

        const members = await UserTeam.findAll({
            where: {
                teamId: userteam.dataValues.teamId
            }
        });

        const result = [];
        for (let i = 0; i < members.length; i++) {
            const user = await User.findOne({
                where: {
                    id: members[i].dataValues.userId
                }
            }).then(data => {
                delete data.dataValues.password
                let hello = {
                    ...members[i].dataValues,
                    userObject: data.dataValues
                };
                return result.push(hello)
            })
        }


        return res.status(200).send({
            message: "Успех",
            team: {
                ...team.dataValues,
                members: result
            }

        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.leaveFromCommand = async (req, res) => {
    try {
        const userId = req.userId;
        const userteam = await UserTeam.destroy({
            where: {
                userId: userId
            }
        })

        return res.status(200).send({
            message: "Пользователь успешно удалён"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.deleteTeam = async (req, res) => {
    try {
        const userId = req.userId;
        const team = await Team.findOne({
            where: {
                leaderid: userId
            }
        })

        if (!team) {
            return res.status(400).send({
                message: "Данный пользователь не создавал команду"
            })
        }

        await UserTeam.destroy({
            where: {
                teamId: team.dataValues.id
            }
        })

        const result = await team.destroy();

        if (result) return res.status(200).send({
            message: "Пользователь успешно удалён"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

exports.excludeMember = async (req, res) => {
    try {
        const userId = req.userId;
        const {
            userid
        } = req.body;
        const team = await Team.findOne({
            where: {
                leaderid: userId
            }
        })

        if (!team) {
            return res.status(400).send({
                message: "Вы не явялетесь командиром какой-либо команды"
            })
        }

        const result = await UserTeam.destroy({
            where: {
                userId: userid
            }
        })

        if (result) return res.status(200).send({
            message: "Пользователь успешно исключён"
        })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}