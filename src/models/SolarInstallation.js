const mongoose = require('mongoose');

const solarInstallationSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        substationId: {
            type: String,
            required: true,
            ref: 'GridSubstation'
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        meterId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        capacityKw: {
            type: Number,
            required: true,
            min: 0
        },

        latitude: {
            type: Number,
            required: true
        },

        longitude: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('SolarInstallation', solarInstallationSchema);