const District = require('../models/District');
const GridSubstation = require('../models/GridSubstation');

async function getDistricts(req, res, next) {
    try {
        let filter = {};

        // National users can see all districts
        if (req.user.jurisdictionType === 'national') {
            filter = {};
        }

        // Province users can see districts in their province
        else if (req.user.jurisdictionType === 'province') {
            filter = {
                provinceId: req.user.jurisdictionId
            };
        }

        // District users can see only their district
        else if (req.user.jurisdictionType === 'district') {
            filter = {
                _id: req.user.jurisdictionId
            };
        }

        else {
            return res.status(403).json({
                code: 'ACCESS_DENIED',
                message: 'Access denied',
                detail: 'You are not authorized to access districts.'
            });
        }

        const districts = await District
            .find(filter)
            .sort({ name: 1 });

        return res.setETag(districts);

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

        return res.setETag(district);
    } catch (error) {
        next(error);
    }
}

async function getDistrictsByProvince(req, res, next) {
    try {
        const districts = await District.find({
            provinceId: req.params.provinceId
        }).sort({ name: 1 });

        return res.setETag(districts);
    } catch (error) {
        next(error);
    }
}

async function getGridSubstationsByDistrict(req, res, next) {
    try {

        const substations = await GridSubstation.find({
            districtId: req.params.districtId
        }).sort({ name: 1 });

        return res.setETag(substations);
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