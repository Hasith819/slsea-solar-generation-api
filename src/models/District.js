const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        provinceId: {
            type: String,
            required: true,
            ref: 'Province'
        },

        name: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model('District', districtSchema);