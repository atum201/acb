const mongoose = require('mongoose');
const { Schema } = mongoose;

const factSchema = new Schema({
	fact_id: String,
	name: String,
	number: String,
	description: String,
	create_date: Date,
	mordify_date: Date,
	status: String,
	createdAt: Date
});

module.exports = mongoose.model('Fact', factSchema);