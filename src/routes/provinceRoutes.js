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

const {
    conditionalGet
} = require('../middleware/conditionalGet');

const router = express.Router();

router.get(
    '/',
    authenticate,
    conditionalGet,
    getProvinces
);
router.get(
    '/:provinceId/districts',
    authenticate,
    authorizeProvince,
    conditionalGet,
    getDistrictsByProvince
);
router.get(
    '/:provinceId',
    authenticate,
    authorizeProvince,
    conditionalGet,
    getProvinceById
);

module.exports = router;