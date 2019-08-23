const { responseOk, responseError } = require('../helpers/paginate.helper');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
var Jimp = require('jimp');
const dir = 'upload';
const now = new Date();
const year = now.getFullYear()
const month = now.getMonth();

exports.uploadImage = (req, res) => {
    //console.log(now)
    let fileUpload = req.files.file;
    let name = fileUpload.name.split(".");
    let typeFile = name[name.length - 1];

    try {

        if (!req.files) {
            return responseError(res, 404);
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        if (!fs.existsSync(`${dir}/${year}`)) {
            fs.mkdirSync(`${dir}/${year}`)
        }
        if (!fs.existsSync(`${dir}/${year}/${month}`)) {
            fs.mkdirSync(`${dir}/${year}/${month}`)
        }
        let pathFile = `${dir}/${year}/${month}`;

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

        // Use the mv() method to place the file somewhere on your server
        let uuid = uuidv4();
        fileUpload.mv(`${pathFile}/${uuid}.${typeFile}`, async (err) => {
            if (!err) {
                Jimp.read(`${pathFile}/${uuid}.${typeFile}`, (err, lenna) => {
                    if (err) throw err;
                    lenna
                        //.resize(256, 256) // resize
                        .quality(60) // set JPEG quality
                        //.greyscale() // set greyscale
                        .write(`${pathFile}/${uuid}.${typeFile}`); // save
                });

                return responseOk(res, `${pathFile}/${uuid}.${typeFile}`);
            }
            return responseError(res, 500, err);
        });

    } catch (err) {
        return responseError(res, 500, err);
    }
}
