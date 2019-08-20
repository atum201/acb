const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema({
	event_id: String,
	name: String,
	register: String,
	description: String,
	create_date: Date,
	start_register:Date,
	end_register:Date,
	start_date: Date,
	end_date: Date,
	status: String,
	createdAt: Date
});

module.exports = mongoose.model('Event', eventSchema);