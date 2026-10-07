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

const {
    conditionalGet
} = require('../middleware/conditionalGet');

const router = express.Router();

router.get(
    '/',
    authenticate,
    conditionalGet,
    getGridSubstations
);
router.get(
    '/:substationId/installations',
    authenticate,
    authorizeSubstation,
    conditionalGet,
    getInstallationsBySubstation
);
router.get(
    '/:substationId',
    authenticate,
    authorizeSubstation,
    conditionalGet,
    getGridSubstationById
);

module.exports = router;