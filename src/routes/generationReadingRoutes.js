const express = require('express');

const {
    getGenerationReadings,
    getGenerationReadingById
} = require('../controllers/generationReadingController');

const router = express.Router();

router.get('/', getGenerationReadings);
router.get('/:readingId', getGenerationReadingById);

module.exports = router;