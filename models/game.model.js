const mongoose = require('mongoose');
const { Schema } = mongoose;

const gameSchema = new Schema({
    game_id: String, //= room in socket
    name: String,
    status: {
        type: String,
        enum: ['PENDING', 'OPENING', 'PLAYING', 'FINISHED'],
        default: 'PENDING'
    },
    bonus: Number,
    recommend: String,
    start_date: Date
}, {
        timestamps: true,
        toJSON: { // khi virtual forein key bắt buộc phải có
            virtuals: true
        }
    });

gameSchema.virtual('results', {
    ref: 'Result',
    localField: 'game_id',
    foreignField: 'game_id',
    justOne: false,
});

gameSchema.virtual('questions', {
    ref: 'Question',
    localField: 'game_id',
    foreignField: 'game_id',
    justOne: false,
});

module.exports = mongoose.model('Game', gameSchema);