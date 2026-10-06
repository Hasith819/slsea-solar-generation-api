const mongoose = require('mongoose');

const gridSubstationSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        districtId: {
            type: String,
            required: true,
            ref: 'District'
        },

        name: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('GridSubstation', gridSubstationSchema);