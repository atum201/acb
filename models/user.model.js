const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    user_id: {
        type: String,
        default: function () {
            return this.employeeID ? this.employeeID : '';
        }
    },
    employeeID: String,
    // name: String,
    socketId: String,
    username: String,
    employeeNumber: String,
    employeeType: String,
    firstname: String,
    lastname: String,
    mail: String,
    mobile: String,
    title: String,
    user: String,
    department: String
},
    {
        timestamps: true,
        toJSON: { // khi virtual forein key bắt buộc phải có
            virtuals: true
        }
    });

userSchema.virtual('results', {
    ref: 'Result',
    localField: 'user_id',
    foreignField: 'user_id',
    justOne: false,
});

module.exports = mongoose.model('User', userSchema);