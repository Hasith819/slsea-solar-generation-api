const express = require('express');

const {
    getDistricts,
    getDistrictById,
    getGridSubstationsByDistrict
} = require('../controllers/districtController');

const router = express.Router();

router.get('/', getDistricts);
router.get('/:districtId', getDistrictById);
router.get('/:districtId/grid-substations', getGridSubstationsByDistrict);

module.exports = router;