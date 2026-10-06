const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Province', provinceSchema);