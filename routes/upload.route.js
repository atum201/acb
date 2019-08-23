const express = require('express');
const UploadImage = require('../controllers/image.controller');
var multer  = require('multer')
const fs = require('fs')
const router = express.Router();
var storageImg = multer.diskStorage({
    destination: (req, file, cb) => {
    	console.log("destination",req.body.imgname||"dsdsds",req.file, file)
      cb(null, 'upload/img')
    },
    filename: (req, file, cb) => {
    	console.log("filename",req.file, file)
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
    	console.log(file);
      cb(null, 'upload/video')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
    }
});
var uploadImg = multer({storage: storageImg});
var uploadVideo = multer({storage: storageVideo});

router.post('/image', uploadImg.single('image'), (req, res, next) => {
	console.log(req.file,req.body.imgname||"dsdsds212121");

	res.json({'image': req.file.path});
});
router.post('/image2', UploadImage.uploadImage, (req, res, next) => {
  console.log(req.file,req.body.imgname||"dsdsds212121");

  res.json({'image': '/upload/img/something'});
});
router.post('/images', uploadImg.any('images'), (req, res, next) => {
	console.log(req.files);
	res.json({'message': 'File uploaded successfully'});
});
router.post('/video', uploadVideo.single('image'), (req, res, next) => {
		console.log(req.file);
		res.json({'message': 'File uploaded successfully'});
});

router.delete('/image/:name',(req, res, next) => {
	let {name} = req.params;

});

module.exports = router;