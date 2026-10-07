const express = require('express');

const {
    getProvinces,
    getProvinceById
} = require('../controllers/provinceController');

const {
    getDistrictsByProvince
} = require('../controllers/districtController');

const { authenticate } = require('../middleware/authMiddleware');
const { authorizeProvince } = require('../middleware/jurisdictionMiddleware');

const router = express.Router();

router.get(
    '/',
    authenticate,
    getProvinces
);
router.get('/:provinceId/districts', getDistrictsByProvince);
router.get(
    '/:provinceId',
    authenticate,
    authorizeProvince,
    getProvinceById
);

module.exports = router;