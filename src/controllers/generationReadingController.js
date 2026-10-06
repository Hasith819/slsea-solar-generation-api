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
        const page = Math.max(
            Number.parseInt(req.query.page, 10) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                Number.parseInt(req.query.limit, 10) || 20,
                1
            ),
            100
        );

        const skip = (page - 1) * limit;

        const filter = {
            installationId: req.params.installationId
        };

        if (req.query.from || req.query.to) {
            filter.timestamp = {};

            if (req.query.from) {
                filter.timestamp.$gte = new Date(req.query.from);
            }

            if (req.query.to) {
                filter.timestamp.$lte = new Date(req.query.to);
            }
        }

        const [readings, total] = await Promise.all([
            GenerationReading
                .find(filter)
                .sort({
                    timestamp: req.query.sort === 'asc' ? 1 : -1
                })
                .skip(skip)
                .limit(limit),

            GenerationReading.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(total / limit);

        const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`;

        const pagination = {
            page,
            limit,
            total,
            totalPages
        };

        if (page > 1) {
            pagination.previous = `${baseUrl}?page=${page - 1}&limit=${limit}`;
        }

        if (page < totalPages) {
            pagination.next = `${baseUrl}?page=${page + 1}&limit=${limit}`;
        }

        res.status(200).json({
            data: readings,
            pagination
        });

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