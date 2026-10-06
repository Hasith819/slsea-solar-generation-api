const express = require('express');

const {
    getProvinces,
    getProvinceById
} = require('../controllers/provinceController');

const {
    getDistrictsByProvince
} = require('../controllers/districtController');

const router = express.Router();

router.get('/', getProvinces);
router.get('/:provinceId/districts', getDistrictsByProvince);
router.get('/:provinceId', getProvinceById);

module.exports = router;