const GridSubstation = require('../models/GridSubstation');

async function getGridSubstations(req, res, next) {
    try {
        let filter = {};

        // National users can see all substations
        if (req.user.jurisdictionType === 'national') {
            filter = {};
        }

        // Province users need substations belonging
        // to districts inside their province
        else if (req.user.jurisdictionType === 'province') {
            const District = require('../models/District');

            const districts = await District.find({
                provinceId: req.user.jurisdictionId
            }).select('_id');

            const districtIds = districts.map(
                district => district._id
            );

            filter = {
                districtId: { $in: districtIds }
            };
        }

        // District users can see only their district's substations
        else if (req.user.jurisdictionType === 'district') {
            filter = {
                districtId: req.user.jurisdictionId
            };
        }

        else {
            return res.status(403).json({
                code: 'ACCESS_DENIED',
                message: 'Access denied',
                detail: 'You are not authorized to access grid substations.'
            });
        }

        const substations = await GridSubstation
            .find(filter)
            .sort({ name: 1 });

        return res.setETag(substations);

    } catch (error) {
        next(error);
    }
}

async function getGridSubstationById(req, res, next) {
    try {
        const substation = await GridSubstation.findById(
            req.params.substationId
        );

        if (!substation) {
            return res.status(404).json({
                code: 'SUBSTATION_NOT_FOUND',
                message: 'Grid substation not found',
                detail: `No grid substation exists with id '${req.params.substationId}'.`
            });
        }

        return res.setETag(substation);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getGridSubstations,
    getGridSubstationById
};