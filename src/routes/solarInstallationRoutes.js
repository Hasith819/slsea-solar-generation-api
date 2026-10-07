const express = require('express');

const {
    getSolarInstallations,
    getSolarInstallationById,
    getInstallationsBySubstation
} = require('../controllers/solarInstallationController');

const {
    getReadingsByInstallation,
    getLatestReadingByInstallation,
    createGenerationReading
} = require('../controllers/generationReadingController');

const {
    authenticate
} = require('../middleware/authMiddleware');

const {
    authorizeInstallation
} = require('../middleware/jurisdictionMiddleware');

const router = express.Router();

router.get('/', getSolarInstallations);

router.get(
    '/:installationId/readings/latest',
    authenticate,
    authorizeInstallation,
    getLatestReadingByInstallation
);

router.get(
    '/:installationId/readings',
    authenticate,
    authorizeInstallation,
    getReadingsByInstallation
);

router.post(
    '/:installationId/readings',
    authenticate,
    createGenerationReading
);

router.get(
    '/:installationId',
    authenticate,
    authorizeInstallation,
    getSolarInstallationById
);

module.exports = router;