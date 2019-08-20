const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    game_id: String,
    ordinalNumber: Number, // số thứ tự
    title: String,
    answerA: String,
    answerB: String,
    answerC: String,
    answerD: String,
    explain: String,
    rightAnswer: {
        type: String,
        enum: ['A', 'B', 'C', 'D'],
        default: 'A'
    },
    peopleSelectA: {
        type: Number,
        default: 0
    },
    peopleSelectB: {
        type: Number,
        default: 0
    },
    peopleSelectC: {
        type: Number,
        default: 0
    },
    peopleSelectD: {
        type: Number,
        default: 0
    },
    rightQuantity: {
        type: Number,
        default: 0
    },
    wrongQuantity: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Question', questionSchema);