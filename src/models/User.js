const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        passwordHash: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true,
            enum: ['national', 'province', 'district']
        },

        jurisdictionId: {
            type: String,
            default: null
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('User', userSchema);