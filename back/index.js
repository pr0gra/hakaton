const express = require('express')
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const commonConf = require('./configs/common.config')

const authRoutes = require('./routes/auth.routes')
const caseRoutes = require('./routes/case.route')
const teamRoutes = require('./routes/team.route')
const adminRoutes = require('./routes/admin.routes')

const {
    createAdminAccount
} = require('./utils/createAdminAccout')

app.use(cors({
    credentials: true,
    origin: commonConf.CLIENT_URL
}))
app.use(express.json());
app.use(cookieParser());

const db = require('./models/index');
const Role = db.role;
const Case = db.case;

db.sequelize.sync({
    force: true
}).then(() => {
    initial();
});

app.use('/api', authRoutes);
app.use('/api/cases', caseRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/admin', adminRoutes)

app.listen(3000, (error) => {
    if (error) {
        return console.log(error)
    }
    return console.log('Server started')
})

function initial() {
    Role.create({
        id: 1,
        name: "user",
    });

    Role.create({
        id: 2,
        name: "admin",
    });
    Case.create({
        id: 2,
        name: "3D-моделирование",
        description: "Создать реалистичную 3D-модель холодного оружия для видеоигры"
    })
    Case.create({
        id: 1,
        name: "Геймдизайн",
        description: `Тема: "Манапанк" Создать рабочий прототип игры в сеттинге магического мира с современными технологиями`
    })
    Case.create({
        id: 3,
        name: "Саунд-дизайн",
        description: `Создать заглавную мелодию и звуковые эффекты для инди-проекта`
    })
    Case.create({
        id: 4,
        name: "Очень интересно",
        description: `Создать приложение для медицинской системы учëта пациентов`
    })
    createAdminAccount({
        name: "admin",
        surname: "admin",
        patronymic: "admin",
        phone: "admin",
        dateOfBorn: "admin",
        email: "vladislav.kori@yandex.ru",
        tglink: "123",
        password: "admin758259",
    })  
}