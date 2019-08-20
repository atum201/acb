const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
	news_id: String,
	title: String,
	description: String,
	content: String,
	author: String,
	status: String,
	createdAt: Date
});

module.exports = mongoose.model('News', newsSchema);