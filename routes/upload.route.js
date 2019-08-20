const express = require('express');
var multer  = require('multer')
const router = express.Router();

var upload = multer({ dest: 'uploads/' })
const storage = multer.memoryStorage()
const uploadImage = multer({ storage: storage })
const uploadImages = multer({ storage: storage }).any('images')


router.post('/image', uploadImage.single('image'),function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log(req.file)
  next()
});

router.post('/images', uploadImages,function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

module.exports = router;