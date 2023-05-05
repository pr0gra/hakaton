const config = require('../configs/db.config')
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        // operatorsAliases: false,
        logging: false,
        timestamps: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
)

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.tokens = require('./tokens.model')(sequelize, Sequelize);
db.case = require('./case.model')(sequelize, Sequelize);
db.team = require('./team.model')(sequelize, Sequelize);
db.userteam = require('./user_team.model')(sequelize, Sequelize);
db.requests = require('./requests.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.user.hasMany(db.tokens, {
    foreignKey: 'userid'
});

db.user.belongsToMany(db.team, {through: db.userteam});
db.team.belongsToMany(db.user, {through: db.userteam});

module.exports = db;