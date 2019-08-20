const User = require('../models/user.model');
const Game = require('../models/game.model');
const Question = require('../models/question.model');
const Admin = require('../models/admin.model');
const Info = require('../models/info.model');
const { hash } = require('bcrypt');


(async () => {

    const countAdmin = await Admin.countDocuments();
    const countInfo = await Info.countDocuments();
    
    if (countAdmin == 0) {
        const admin = new Admin({
            name: 'Admin',
            username: 'adminGameConfetti@acb.com',
            password: await hash('Jelly@123', 10),
            dateOfBirth: '01-01-2019',
            phone: '',
            address: ''
        });
        await admin.save();
    }
    if (countInfo == 0) {
        const info = new Info({
            law: 'Đây là thông tin trò chơi'
        })
        await info.save();
    }

})();