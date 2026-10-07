const Province = require('../models/Province');

async function getProvinces(req, res, next) {
    try {
        let filter = {};

        // National users can see all provinces
        if (req.user.jurisdictionType === 'national') {
            filter = {};
        }

        // Province users can see only their province
        else if (req.user.jurisdictionType === 'province') {
            filter = {
                _id: req.user.jurisdictionId
            };
        }

        // District users can see their parent province
        else if (req.user.jurisdictionType === 'district') {
            const District = require('../models/District');

            const district = await District.findById(
                req.user.jurisdictionId
            );

            if (!district) {
                return res.status(403).json({
                    code: 'INVALID_JURISDICTION',
                    message: 'Invalid jurisdiction',
                    detail: 'The user jurisdiction could not be found.'
                });
            }

            filter = {
                _id: district.provinceId
            };
        }

        else {
            return res.status(403).json({
                code: 'ACCESS_DENIED',
                message: 'Access denied',
                detail: 'You are not authorized to access provinces.'
            });
        }

        const provinces = await Province
            .find(filter)
            .sort({ name: 1 });

        return res.setETag(provinces);

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

       return res.setETag(province);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getProvinces,
    getProvinceById
};