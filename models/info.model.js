const mongoose = require('mongoose');
const { Schema } = mongoose;

const infoSchema = new Schema({
    law: String,
    // prize_info: String,
    waitForTheNextQuestion: {
        type: Number,
        default: 10
    },
    waitForTheAnswer: {
        type: Number,
        default: 10
    }
}, {
        timestamps: true
    });

module.exports = mongoose.model('Info', infoSchema);