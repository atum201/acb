const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// const url = 'mongodb://localhost:27017/acb-game-confetti';
const url = 'mongodb://mongo:27017/acb-game-confetti'

mongoose.Promise = global.Promise;
mongoose.plugin(mongoosePaginate);
// mongoose.set('toJSON', {
//     virtuals: true
// });
// mongoose.set('toObject', {
//     virtuals: true
// });

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});