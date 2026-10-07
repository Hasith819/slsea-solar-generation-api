const express = require('express');

const {
    getGenerationReadings,
    getGenerationReadingById
} = require('../controllers/generationReadingController');

const {
    authenticate
} = require('../middleware/authMiddleware');

const {
    authorizeReading
} = require('../middleware/jurisdictionMiddleware');

const router = express.Router();

router.get(
    '/',
    authenticate,
    getGenerationReadings
);

router.get(
    '/:readingId',
    authenticate,
    authorizeReading,
    getGenerationReadingById
);

module.exports = router;