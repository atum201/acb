const Fact = require('../models/fact.model');
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

    Fact.find(query).sort({ createdAt: 'asc' }).then(list => responseOk(res, list))
        .catch(error => responseError(res, 500, error.message));
}

module.exports.getDetail = async (req, res) => {
    const { id } = req.params;
    return Fact.findById(id)
        .then(item => {
            if (!item)
                return responseError(res, 404, 'FACT_NOT_FOUND');
            responseOk(res, item);
        })
        .catch(error => {
            console.log(error.message);
            responseError(res, 500, error.message);
        });
}

module.exports.create = async (req, res) => {
    Fact.init().then(async () => {

        let { body } = req;
        const fact_id = Math.ceil(Math.random() * 100000);

        // if (moment() > moment(body.start_date))
        //     return responseError(res, 409, 'START_DATE_INVALID');

        const fact = await Fact.findOne({ fact_id });
        if (fact)
            return responseError(res, 409, 'FACT_ID_IS_EXISTED');

        const collection = new Fact({
            ...body,
            fact_id,
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
    Fact.init().then(async () => {
        let { body } = req;

        if (body.fact_id)
            delete body.fact_id;

        // if (body.start_date) {
        //     if (moment() > moment(body.start_date))
        //         return responseError(res, 409, 'START_DATE_INVALID');
        //     else
        //         body.start_date = moment(body.start_date);
        // }

        const fact = await Fact.findOne({ fact_id: req.params.fact_id });

        // if (fact.status != 'PENDING')
        //     return responseError(res, 700, 'GAME_STATUS_MUST_BE_PENDING');

        Fact.findOneAndUpdate(
            { fact_id: req.params.fact_id },
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
    return Fact.init().then(async () => {
        const { fact_id } = req.params;

        const fact = await Fact.findOne({ fact_id });
        if (!fact)
            return responseError(res, 404, 'FACT_NOT_FOUND');

        await Result.deleteMany({ fact_id });
        // await Question.deleteMany({ fact_id });
        // await Game.deleteOne({ game_id });
        responseOk(res, { success: true, message: 'ok' });
    })
        .catch(error => responseError(res, 500, error.message));
}