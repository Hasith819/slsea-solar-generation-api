const express = require('express');

const {
    conditionalGet
} = require('../middleware/conditionalGet');

const {
    getSolarInstallations,
    getSolarInstallationById,
    getInstallationsBySubstation,
    createSolarInstallation,
    updateSolarInstallation,
    deleteSolarInstallation
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
    authorizeInstallation,
    authorizeInstallationCreate,
    authorizeInstallationUpdate
} = require('../middleware/jurisdictionMiddleware');

const router = express.Router();

router.get(
    '/',
    authenticate,
    conditionalGet,
    getSolarInstallations
);

router.get(
    '/:installationId/readings/latest',
    authenticate,
    authorizeInstallation,
    conditionalGet,
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

router.post(
    '/',
    authenticate,
    authorizeInstallationCreate,
    createSolarInstallation
);
router.put(
    '/:installationId',
    authenticate,
    authorizeInstallation,
    authorizeInstallationUpdate,
    updateSolarInstallation
);
router.delete(
    '/:installationId',
    authenticate,
    authorizeInstallation,
    deleteSolarInstallation
);
router.get(
    '/:installationId',
    authenticate,
    authorizeInstallation,
    conditionalGet,
    getSolarInstallationById
);

module.exports = router;