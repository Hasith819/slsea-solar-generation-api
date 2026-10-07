const express = require('express');

const {
    getDistricts,
    getDistrictById,
    getGridSubstationsByDistrict
} = require('../controllers/districtController');

const {
    authenticate
} = require('../middleware/authMiddleware');

const {
    authorizeDistrict
} = require('../middleware/jurisdictionMiddleware');

const {
    conditionalGet
} = require('../middleware/conditionalGet');

const router = express.Router();

router.get(
    '/',
    authenticate,
    conditionalGet,
    getDistricts
);

router.get(
    '/:districtId',
    authenticate,
    authorizeDistrict,
    conditionalGet,
    getDistrictById
);

router.get(
    '/:districtId/grid-substations',
    authenticate,
    authorizeDistrict,
    conditionalGet,
    getGridSubstationsByDistrict
);

module.exports = router;