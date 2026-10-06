const express = require('express');

const {
    getSolarInstallations,
    getSolarInstallationById,
    getInstallationsBySubstation
} = require('../controllers/solarInstallationController');

const {
    getReadingsByInstallation,
    getLatestReadingByInstallation
} = require('../controllers/generationReadingController');

const router = express.Router();

router.get('/', getSolarInstallations);
router.get('/:installationId/readings/latest', getLatestReadingByInstallation);
router.get('/:installationId/readings', getReadingsByInstallation);
router.get('/:installationId', getSolarInstallationById);

module.exports = router;