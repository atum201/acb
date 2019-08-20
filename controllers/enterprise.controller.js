const Enterprise = require('../models/enterprise.model');
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

    Enterprise.find(query).sort({ createdAt: 'asc' }).then(list => responseOk(res, list))
        .catch(error => responseError(res, 500, error.message));
}

module.exports.getDetail = async (req, res) => {
    const { id } = req.params;
    return Enterprise.findById(id)
        .then(item => {
            if (!item)
                return responseError(res, 404, 'ENTERPRISE_NOT_FOUND');
            responseOk(res, item);
        })
        .catch(error => {
            console.log(error.message);
            responseError(res, 500, error.message);
        });
}

module.exports.create = async (req, res) => {
    Enterprise.init().then(async () => {

        let { body } = req;
        const enterprise_id = Math.ceil(Math.random() * 100000);

        // if (moment() > moment(body.start_date))
        //     return responseError(res, 409, 'START_DATE_INVALID');

        const enterprise = await Enterprise.findOne({ enterprise_id });
        if (enterprise)
            return responseError(res, 409, 'ENTERPRISE_ID_IS_EXISTED');

        const collection = new Enterprise({
            ...body,
            enterprise_id,
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
    Enterprise.init().then(async () => {
        let { body } = req;

        if (body.enterprise_id)
            delete body.enterprise_id;

        // if (body.start_date) {
        //     if (moment() > moment(body.start_date))
        //         return responseError(res, 409, 'START_DATE_INVALID');
        //     else
        //         body.start_date = moment(body.start_date);
        // }

        const enterprise = await Enterprise.findOne({ enterprise_id: req.params.enterprise_id });

        // if (enterprise.status != 'PENDING')
        //     return responseError(res, 700, 'GAME_STATUS_MUST_BE_PENDING');

        Enterprise.findOneAndUpdate(
            { enterprise_id: req.params.enterprise_id },
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
    return Enterprise.init().then(async () => {
        const { enterprise_id } = req.params;

        const enterprise = await Enterprise.findOne({ enterprise_id });
        if (!enterprise)
            return responseError(res, 404, 'ENTERPRISE_NOT_FOUND');

        await Result.deleteMany({ enterprise_id });
        // await Question.deleteMany({ enterprise_id });
        // await Game.deleteOne({ game_id });
        responseOk(res, { success: true, message: 'ok' });
    })
        .catch(error => responseError(res, 500, error.message));
}