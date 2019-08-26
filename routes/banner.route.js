const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/banner.controller');

router.get('/list', BannerController.getList);

router.get('/:banner_id', BannerController.getDetail);

router.post('/', BannerController.create);

router.put('/:banner_id', BannerController.edit);

router.delete('/delete/:banner_id', BannerController.remove);

module.exports = router;