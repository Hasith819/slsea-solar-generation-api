const mongoose = require('mongoose');

const generationReadingSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        installationId: {
            type: String,
            required: true,
            ref: 'SolarInstallation'
        },

        timestamp: {
            type: Date,
            required: true
        },

        powerKw: {
            type: Number,
            required: true,
            min: 0
        },

        energyKwh: {
            type: Number,
            required: true,
            min: 0
        },

        voltage: {
            type: Number,
            required: true,
            min: 0
        }
    },
    {
        versionKey: false
    }
);

// Helps with installation reading history queries
generationReadingSchema.index({
    installationId: 1,
    timestamp: -1
});

module.exports = mongoose.model(
    'GenerationReading',
    generationReadingSchema
);