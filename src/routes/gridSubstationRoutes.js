const express = require('express');

const {
    getGridSubstations,
    getGridSubstationById
} = require('../controllers/gridSubstationController');

const {
    getInstallationsBySubstation
} = require('../controllers/solarInstallationController');

const {
    authenticate
} = require('../middleware/authMiddleware');

const {
    authorizeSubstation
} = require('../middleware/jurisdictionMiddleware');

const router = express.Router();

router.get(
    '/',
    authenticate,
    getGridSubstations
);
router.get('/:substationId/installations', getInstallationsBySubstation);
router.get(
    '/:substationId',
    authenticate,
    authorizeSubstation,
    getGridSubstationById
);

module.exports = router;