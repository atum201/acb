const mongoose = require('mongoose');
const { Schema } = mongoose;

const bannerSchema = new Schema({
	banner_id: String,
	name: String,
	code: String,
	link: String,
	img: String,
	status: String,
	createdAt: Date
});

module.exports = mongoose.model('Banner', bannerSchema);