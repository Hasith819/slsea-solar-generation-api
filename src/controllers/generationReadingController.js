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

        if (
            req.query.sort &&
            !['asc', 'desc'].includes(req.query.sort)
        ) {
            return res.status(400).json({
                code: 'INVALID_SORT',
                message: 'Invalid sort parameter',
                detail: "The 'sort' parameter must be either 'asc' or 'desc'."
            });
        }

        const fromDate = req.query.from
            ? new Date(req.query.from)
            : null;

        const toDate = req.query.to
            ? new Date(req.query.to)
            : null;

        if (req.query.from && Number.isNaN(fromDate.getTime())) {
            return res.status(400).json({
                code: 'INVALID_FROM_DATE',
                message: 'Invalid from date',
                detail: "The 'from' parameter must be a valid ISO 8601 date and time."
            });
        }

        if (req.query.to && Number.isNaN(toDate.getTime())) {
            return res.status(400).json({
                code: 'INVALID_TO_DATE',
                message: 'Invalid to date',
                detail: "The 'to' parameter must be a valid ISO 8601 date and time."
            });
        }

        if (fromDate && toDate && fromDate > toDate) {
            return res.status(400).json({
                code: 'INVALID_DATE_RANGE',
                message: 'Invalid date range',
                detail: "The 'from' date must be earlier than or equal to the 'to' date."
            });
        }

        const page = req.query.page
            ? Number(req.query.page)
            : 1;

        const limit = req.query.limit
            ? Number(req.query.limit)
            : 20;

        if (!Number.isInteger(page) || page < 1) {
            return res.status(400).json({
                code: 'INVALID_PAGE',
                message: 'Invalid page parameter',
                detail: "The 'page' parameter must be a positive integer."
            });
        }

        if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
            return res.status(400).json({
                code: 'INVALID_LIMIT',
                message: 'Invalid limit parameter',
                detail: "The 'limit' parameter must be an integer between 1 and 100."
            });
        }

        const skip = (page - 1) * limit;

        const filter = {
            installationId: req.params.installationId
        };

        if (fromDate || toDate) {
            filter.timestamp = {};

            if (fromDate) {
                filter.timestamp.$gte = fromDate;
            }

            if (toDate) {
                filter.timestamp.$lte = toDate;
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