const SolarInstallation = require('../models/SolarInstallation');

async function getSolarInstallations(req, res, next) {
    try {
        let filter = {};

        // National users can see all installations
        if (req.user.jurisdictionType === 'national') {
            filter = {};
        }

        // Province users can see installations
        // belonging to substations in their province
        else if (req.user.jurisdictionType === 'province') {
            const District = require('../models/District');
            const GridSubstation = require('../models/GridSubstation');

            const districts = await District.find({
                provinceId: req.user.jurisdictionId
            }).select('_id');

            const districtIds = districts.map(
                district => district._id
            );

            const substations = await GridSubstation.find({
                districtId: { $in: districtIds }
            }).select('_id');

            const substationIds = substations.map(
                substation => substation._id
            );

            filter = {
                substationId: { $in: substationIds }
            };
        }

        // District users can see installations
        // belonging to substations in their district
        else if (req.user.jurisdictionType === 'district') {
            const GridSubstation = require('../models/GridSubstation');

            const substations = await GridSubstation.find({
                districtId: req.user.jurisdictionId
            }).select('_id');

            const substationIds = substations.map(
                substation => substation._id
            );

            filter = {
                substationId: { $in: substationIds }
            };
        }

        else {
            return res.status(403).json({
                code: 'ACCESS_DENIED',
                message: 'Access denied',
                detail: 'You are not authorized to access solar installations.'
            });
        }

        const installations = await SolarInstallation
            .find(filter)
            .sort({ name: 1 });

        return res.setETag(installations);

    } catch (error) {
        next(error);
    }
}

async function getSolarInstallationById(req, res, next) {
    try {
        const installation = await SolarInstallation.findById(
            req.params.installationId
        );

        if (!installation) {
            return res.status(404).json({
                code: 'INSTALLATION_NOT_FOUND',
                message: 'Solar installation not found',
                detail: `No solar installation exists with id '${req.params.installationId}'.`
            });
        }

       return res.setETag(installation);

    } catch (error) {
        next(error);
    }
}

async function getInstallationsBySubstation(req, res, next) {
    try {
        const installations = await SolarInstallation
            .find({
                substationId: req.params.substationId
            })
            .sort({ name: 1 });

        return res.setETag(installations);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSolarInstallations,
    getSolarInstallationById,
    getInstallationsBySubstation
};