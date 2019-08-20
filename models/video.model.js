const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
	video_id: String,
	name: String,
	link: String,
	img: String,
	creater: String,
	status: String,
	createdAt: Date
});

module.exports = mongoose.model('Video', videoSchema);