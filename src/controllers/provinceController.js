const Province = require('../models/Province');

async function getProvinces(req, res, next) {
    try {
        const provinces = await Province.find().sort({ name: 1 });

        res.status(200).json(provinces);
    } catch (error) {
        next(error);
    }
}

async function getProvinceById(req, res, next) {
    try {
        const province = await Province.findById(req.params.provinceId);

        if (!province) {
            return res.status(404).json({
                code: 'PROVINCE_NOT_FOUND',
                message: 'Province not found',
                detail: `No province exists with id '${req.params.provinceId}'.`
            });
        }

        res.status(200).json(province);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProvinces,
    getProvinceById
};