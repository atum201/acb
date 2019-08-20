const Video = require('../models/video.model');
const { responseOk, responseError } = require('../helpers/paginate.helper');
const { searchingQueries, pagingOptions } = require('../helpers/paginate.helper');
// const moment = require('moment');

// const Excel = require('exceljs');
// const dirExport = './public/exports/results/';
// const pathRedirect = '/exports/results/';

module.exports.getList = (req, res) => {
    // const { status } = req.query;

    let query = {};
    // if (status == 'all')
    //     input.status = { : null };
    // else if (status)
    //     input.status = status;

    Video.find(query).sort({ createdAt: 'asc' }).then(list => responseOk(res, list))
        .catch(error => responseError(res, 500, error.message));
}

module.exports.getDetail = async (req, res) => {
    const { id } = req.params;
    return Video.findById(id)
        .then(item => {
            if (!item)
                return responseError(res, 404, 'VIDEO_NOT_FOUND');
            responseOk(res, item);
        })
        .catch(error => {
            console.log(error.message);
            responseError(res, 500, error.message);
        });
}

module.exports.create = async (req, res) => {
    Video.init().then(async () => {

        let { body } = req;
        const video_id = Math.ceil(Math.random() * 100000);

        // if (moment() > moment(body.start_date))
        //     return responseError(res, 409, 'START_DATE_INVALID');

        const video = await Video.findOne({ video_id });
        if (video)
            return responseError(res, 409, 'VIDEO_ID_IS_EXISTED');

        const collection = new Video({
            ...body,
            video_id,
            // start_date: moment(body.start_date)
        });

        const err = collection.validateSync();
        if (!err) {
            collection.save().then(data => {
                data = data.toJSON({
                    list: true
                });

                responseOk(res, data);
            }).catch(err => {
                responseError(
                    res,
                    err.message.indexOf('duplicate key error') !== -1
                        ? 409
                        : 500,
                    err.message
                );
            });
        } else {
            responseError(res, 422, err.message);
        }
    })
        .catch(error => {
            console.log(error.message);
            responseError(res, 500, error.message);
        })
}

module.exports.edit = (req, res) => {
    Video.init().then(async () => {
        let { body } = req;

        if (body.video_id)
            delete body.video_id;

        // if (body.start_date) {
        //     if (moment() > moment(body.start_date))
        //         return responseError(res, 409, 'START_DATE_INVALID');
        //     else
        //         body.start_date = moment(body.start_date);
        // }

        const video = await Video.findOne({ video_id: req.params.video_id });

        // if (video.status != 'PENDING')
        //     return responseError(res, 700, 'GAME_STATUS_MUST_BE_PENDING');

        Video.findOneAndUpdate(
            { video_id: req.params.video_id },
            body,
            {
                new: true
            }).then(data => {
                if (!data) {
                    responseError(res, 404);
                } else {

                    data = data.toJSON({
                        list: true
                    });
                    responseOk(res, data);
                }
            });
    }).catch(err => {
        responseError(res, 500, err.message);
    });

}

module.exports.remove = (req, res) => {
    return Video.init().then(async () => {
        const { video_id } = req.params;

        const video = await Video.findOne({ video_id });
        if (!video)
            return responseError(res, 404, 'VIDEO_NOT_FOUND');

        await Result.deleteMany({ video_id });
        // await Question.deleteMany({ video_id });
        // await Game.deleteOne({ game_id });
        responseOk(res, { success: true, message: 'ok' });
    })
        .catch(error => responseError(res, 500, error.message));
}