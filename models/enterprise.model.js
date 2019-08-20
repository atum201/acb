const mongoose = require('mongoose');
const { Schema } = mongoose;

const enterpriseSchema = new Schema({
	enterprise_id: String,
	name: String,
	user_id: String,
	icon: String,
	address: String,
	phone: String,
	email: String,
	status: String,
	introdution:String,
	createdAt: Date
});

module.exports = mongoose.model('Enterprise', enterpriseSchema);