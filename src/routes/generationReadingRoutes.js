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

const {
    conditionalGet
} = require('../middleware/conditionalGet');



const router = express.Router();

router.get(
    '/',
    authenticate,
    conditionalGet,
    getGenerationReadings
);

router.get(
    '/:readingId',
    authenticate,
    authorizeReading,
    conditionalGet,
    getGenerationReadingById
);

module.exports = router;