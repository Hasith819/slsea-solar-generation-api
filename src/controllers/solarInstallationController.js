const SolarInstallation = require('../models/SolarInstallation');

async function getSolarInstallations(req, res, next) {
    try {
        const installations = await SolarInstallation
            .find()
            .sort({ name: 1 });

        res.status(200).json(installations);
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

        res.status(200).json(installation);
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

        res.status(200).json(installations);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getSolarInstallations,
    getSolarInstallationById,
    getInstallationsBySubstation
};