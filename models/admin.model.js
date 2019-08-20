const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: String,
    username: String,
    password: String,
    dateOfBirth: Date,
    phone: String,
    address: String
},
    {
        timestamps: true,
        toJSON: { // khi virtual forein key bắt buộc phải có
            virtuals: true
        }
    });

module.exports = mongoose.model('Admin', adminSchema);