const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const resultSchema = new Schema({
    game_id: String,
    user_id: String,
    point: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['WIN', 'LOSE', 'PLAYING', 'WATCHING', 'PENDING'],
        default: 'PENDING'
    },
    prize: {
        type: Number,
        default: 0
    }
},
    {
        timestamps: true,
        toJSON: { // khi virtual forein key bắt buộc phải có
            virtuals: true
        }
    });

resultSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'user_id',
    justOne: true,
});

resultSchema.virtual('game', {
    ref: 'Game',
    localField: 'game_id',
    foreignField: 'game_id',
    justOne: true,
});

resultSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Result', resultSchema);