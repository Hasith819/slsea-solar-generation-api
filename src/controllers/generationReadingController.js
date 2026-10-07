const GenerationReading = require('../models/GenerationReading');
const SolarInstallation = require('../models/SolarInstallation');

async function getGenerationReadings(req, res, next) {
    try {
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

        let installationFilter = {};

        // National users can see all installations
        if (req.user.jurisdictionType === 'national') {
            installationFilter = {};
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

            const SolarInstallation = require('../models/SolarInstallation');

            const installations = await SolarInstallation.find({
                substationId: { $in: substationIds }
            }).select('_id');

            const installationIds = installations.map(
                installation => installation._id
            );

            installationFilter = {
                installationId: { $in: installationIds }
            };
        }

        // District users can see installations
        // belonging to substations in their district
        else if (req.user.jurisdictionType === 'district') {
            const GridSubstation = require('../models/GridSubstation');
            const SolarInstallation = require('../models/SolarInstallation');

            const substations = await GridSubstation.find({
                districtId: req.user.jurisdictionId
            }).select('_id');

            const substationIds = substations.map(
                substation => substation._id
            );

            const installations = await SolarInstallation.find({
                substationId: { $in: substationIds }
            }).select('_id');

            const installationIds = installations.map(
                installation => installation._id
            );

            installationFilter = {
                installationId: { $in: installationIds }
            };
        }

        else {
            return res.status(403).json({
                code: 'ACCESS_DENIED',
                message: 'Access denied',
                detail: 'You are not authorized to access generation readings.'
            });
        }

        const filter = {
            ...installationFilter
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

        const skip = (page - 1) * limit;

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
            pagination.previous =
                `${baseUrl}?page=${page - 1}&limit=${limit}`;
        }

        if (page < totalPages) {
            pagination.next =
                `${baseUrl}?page=${page + 1}&limit=${limit}`;
        }

        res.status(200).json({
            data: readings,
            pagination
        });

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

async function createGenerationReading(req, res, next) {
    try {


        if (
            req.user.type !== 'device' ||
            req.user.installationId !== req.params.installationId
        ) {
            return res.status(403).json({
                code: 'INSTALLATION_ACCESS_DENIED',
                message: 'Installation access denied',
                detail: 'This device is not authorized to submit readings for this installation.'
            });
        }

        const {
            timestamp,
            powerKw,
            energyKwh,
            voltage
        } = req.body;

        if (!timestamp || powerKw === undefined || energyKwh === undefined || voltage === undefined) {
            return res.status(400).json({
                code: 'INVALID_READING',
                message: 'Invalid generation reading',
                detail: 'timestamp, powerKw, energyKwh, and voltage are required.'
            });
        }


        const readingDate = new Date(timestamp);

        if (Number.isNaN(readingDate.getTime())) {
            return res.status(400).json({
                code: 'INVALID_TIMESTAMP',
                message: 'Invalid timestamp',
                detail: 'The timestamp must be a valid ISO 8601 date and time.'
            });
        }

        if (typeof powerKw !== 'number' || powerKw < 0) {
            return res.status(400).json({
                code: 'INVALID_POWER',
                message: 'Invalid power value',
                detail: 'powerKw must be a number greater than or equal to 0.'
            });
        }

        if (typeof energyKwh !== 'number' || energyKwh < 0) {
            return res.status(400).json({
                code: 'INVALID_ENERGY',
                message: 'Invalid energy value',
                detail: 'energyKwh must be a number greater than or equal to 0.'
            });
        }

        if (typeof voltage !== 'number' || voltage < 0) {
            return res.status(400).json({
                code: 'INVALID_VOLTAGE',
                message: 'Invalid voltage value',
                detail: 'voltage must be a number greater than or equal to 0.'
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

        const existingReading = await GenerationReading.findById(
            req.body._id
        );

        if (existingReading) {
            const sameReading =
                existingReading.installationId === req.params.installationId &&
                existingReading.timestamp.getTime() === readingDate.getTime() &&
                existingReading.powerKw === req.body.powerKw &&
                existingReading.energyKwh === req.body.energyKwh &&
                existingReading.voltage === req.body.voltage;

            if (sameReading) {
                return res.status(200).json(existingReading);
            }

            return res.status(409).json({
                code: 'READING_ID_CONFLICT',
                message: 'Generation reading ID already exists',
                detail: `A different generation reading already exists with id '${req.body._id}'.`
            });
        }


        const reading = new GenerationReading({
            _id: req.body._id,
            installationId: req.params.installationId,
            timestamp: req.body.timestamp,
            powerKw: req.body.powerKw,
            energyKwh: req.body.energyKwh,
            voltage: req.body.voltage
        });

        await reading.save();

        res
            .status(201)
            .location(`/readings/${reading._id}`)
            .json(reading);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getGenerationReadings,
    getGenerationReadingById,
    getReadingsByInstallation,
    getLatestReadingByInstallation,
    createGenerationReading
};