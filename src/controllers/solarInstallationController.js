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

async function createSolarInstallation(req, res, next) {
    try {
        const {
            _id,
            substationId,
            name,
            meterId,
            capacityKw,
            latitude,
            longitude
        } = req.body;

        if (
            !_id ||
            !substationId ||
            !name ||
            !meterId ||
            capacityKw === undefined ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                code: 'VALIDATION_ERROR',
                message: 'Missing required fields',
                detail: '_id, substationId, name, meterId, capacityKw, latitude and longitude are required.'
            });
        }

        const GridSubstation = require('../models/GridSubstation');

        const substation = await GridSubstation.findById(substationId);

        if (!substation) {
            return res.status(404).json({
                code: 'SUBSTATION_NOT_FOUND',
                message: 'Grid substation not found',
                detail: `No grid substation exists with id '${substationId}'.`
            });
        }

        const installation = await SolarInstallation.create({
            _id,
            substationId,
            name,
            meterId,
            capacityKw,
            latitude,
            longitude
        });

        return res
            .status(201)
            .location(`/installations/${installation._id}`)
            .json(installation);

    } catch (error) {
        next(error);
    }
}

async function updateSolarInstallation(req, res, next) {
    try {
        const {
            substationId,
            name,
            meterId,
            capacityKw,
            latitude,
            longitude
        } = req.body;

        if (
            !substationId ||
            !name ||
            !meterId ||
            capacityKw === undefined ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                code: 'VALIDATION_ERROR',
                message: 'Missing required fields',
                detail: 'substationId, name, meterId, capacityKw, latitude and longitude are required.'
            });
        }

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

        const GridSubstation = require('../models/GridSubstation');

        const substation = await GridSubstation.findById(substationId);

        if (!substation) {
            return res.status(404).json({
                code: 'SUBSTATION_NOT_FOUND',
                message: 'Grid substation not found',
                detail: `No grid substation exists with id '${substationId}'.`
            });
        }

        installation.substationId = substationId;
        installation.name = name;
        installation.meterId = meterId;
        installation.capacityKw = capacityKw;
        installation.latitude = latitude;
        installation.longitude = longitude;

        await installation.save();

        return res.status(200).json(installation);

    } catch (error) {
        next(error);
    }
}

async function deleteSolarInstallation(req, res, next) {
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

        const GenerationReading = require('../models/GenerationReading');

        const readingCount = await GenerationReading.countDocuments({
            installationId: req.params.installationId
        });

        if (readingCount > 0) {
            return res.status(409).json({
                code: 'RESOURCE_HAS_DEPENDENCIES',
                message: 'Solar installation cannot be deleted',
                detail: `The installation has ${readingCount} generation reading(s). Delete is not allowed because generation readings are historical records.`
            });
        }

        await SolarInstallation.deleteOne({
            _id: req.params.installationId
        });

        return res.status(204).end();

    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSolarInstallations,
    getSolarInstallationById,
    getInstallationsBySubstation,
    createSolarInstallation,
    updateSolarInstallation,
    deleteSolarInstallation
};