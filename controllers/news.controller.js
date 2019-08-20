const News = require('../models/news.model');
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

    News.find(query).sort({ createdAt: 'asc' }).then(list => responseOk(res, list))
        .catch(error => responseError(res, 500, error.message));
}

module.exports.getDetail = async (req, res) => {
    const { id } = req.params;
    return News.findById(id)
        .then(item => {
            if (!item)
                return responseError(res, 404, 'NEWS_NOT_FOUND');
            responseOk(res, item);
        })
        .catch(error => {
            console.log(error.message);
            responseError(res, 500, error.message);
        });
}

module.exports.create = async (req, res) => {
    News.init().then(async () => {

        let { body } = req;
        const news_id = Math.ceil(Math.random() * 100000);

        // if (moment() > moment(body.start_date))
        //     return responseError(res, 409, 'START_DATE_INVALID');

        const news = await News.findOne({ news_id });
        if (news)
            return responseError(res, 409, 'NEWS_ID_IS_EXISTED');

        const collection = new News({
            ...body,
            news_id,
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
    News.init().then(async () => {
        let { body } = req;

        if (body.news_id)
            delete body.news_id;

        // if (body.start_date) {
        //     if (moment() > moment(body.start_date))
        //         return responseError(res, 409, 'START_DATE_INVALID');
        //     else
        //         body.start_date = moment(body.start_date);
        // }

        const news = await News.findOne({ news_id: req.params.news_id });

        // if (news.status != 'PENDING')
        //     return responseError(res, 700, 'GAME_STATUS_MUST_BE_PENDING');

        News.findOneAndUpdate(
            { news_id: req.params.news_id },
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
    return News.init().then(async () => {
        const { news_id } = req.params;

        const news = await News.findOne({ news_id });
        if (!news)
            return responseError(res, 404, 'NEWS_NOT_FOUND');

        await Result.deleteMany({ news_id });
        // await Question.deleteMany({ news_id });
        // await Game.deleteOne({ game_id });
        responseOk(res, { success: true, message: 'ok' });
    })
        .catch(error => responseError(res, 500, error.message));
}