const District = require('../models/District');
const GridSubstation = require('../models/GridSubstation');

async function getDistricts(req, res, next) {
    try {
        const districts = await District.find().sort({ name: 1 });

        res.status(200).json(districts);
    } catch (error) {
        next(error);
    }
}

async function getDistrictById(req, res, next) {
    try {
        const district = await District.findById(req.params.districtId);

        if (!district) {
            return res.status(404).json({
                code: 'DISTRICT_NOT_FOUND',
                message: 'District not found',
                detail: `No district exists with id '${req.params.districtId}'.`
            });
        }

        res.status(200).json(district);
    } catch (error) {
        next(error);
    }
}

async function getDistrictsByProvince(req, res, next) {
    try {
        const districts = await District.find({
            provinceId: req.params.provinceId
        }).sort({ name: 1 });

        res.status(200).json(districts);
    } catch (error) {
        next(error);
    }
}

async function getGridSubstationsByDistrict(req, res, next) {
    try {

        const substations = await GridSubstation.find({
            districtId: req.params.districtId
        }).sort({ name: 1 });

        res.status(200).json(substations);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getDistricts,
    getDistrictById,
    getDistrictsByProvince,
    getGridSubstationsByDistrict
};