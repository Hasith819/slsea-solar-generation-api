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

const router = express.Router();

router.get('/', getDistricts);

router.get(
    '/:districtId',
    authenticate,
    authorizeDistrict,
    getDistrictById
);

router.get(
    '/:districtId/grid-substations',
    getGridSubstationsByDistrict
);

module.exports = router;