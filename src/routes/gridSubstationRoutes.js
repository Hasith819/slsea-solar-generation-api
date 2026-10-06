const express = require('express');

const {
    getGridSubstations,
    getGridSubstationById
} = require('../controllers/gridSubstationController');

const {
    getInstallationsBySubstation
} = require('../controllers/solarInstallationController');

const router = express.Router();

router.get('/', getGridSubstations);
router.get('/:substationId/installations', getInstallationsBySubstation);
router.get('/:substationId', getGridSubstationById);

module.exports = router;