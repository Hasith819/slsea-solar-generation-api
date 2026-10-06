const GenerationReading = require('../models/GenerationReading');

async function getGenerationReadings(req, res, next) {
    try {
        const readings = await GenerationReading
            .find()
            .sort({ timestamp: -1 });

        res.status(200).json(readings);
    } catch (error) {
        next(error);
    }
}

async function getGenerationReadingById(req, res, next) {
    try {
        const reading = await GenerationReading.findById(
            req.params.readingId
        );

        if (!reading) {
            return res.status(404).json({
                code: 'READING_NOT_FOUND',
                message: 'Generation reading not found',
                detail: `No generation reading exists with id '${req.params.readingId}'.`
            });
        }

        res.status(200).json(reading);
    } catch (error) {
        next(error);
    }
}

async function getReadingsByInstallation(req, res, next) {
    try {
        const readings = await GenerationReading
            .find({
                installationId: req.params.installationId
            })
            .sort({ timestamp: -1 });

        res.status(200).json(readings);
    } catch (error) {
        next(error);
    }
}

async function getLatestReadingByInstallation(req, res, next) {
    try {
        const reading = await GenerationReading
            .findOne({
                installationId: req.params.installationId
            })
            .sort({ timestamp: -1 });

        if (!reading) {
            return res.status(404).json({
                code: 'READING_NOT_FOUND',
                message: 'No generation reading found',
                detail: `No generation readings exist for installation '${req.params.installationId}'.`
            });
        }

        res.status(200).json(reading);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getGenerationReadings,
    getGenerationReadingById,
    getReadingsByInstallation,
    getLatestReadingByInstallation
};