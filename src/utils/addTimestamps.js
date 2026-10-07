const mongoose = require('mongoose');

const { mongodbUri } = require('../config/env');

const Province = require('../models/Province');
const District = require('../models/District');
const GridSubstation = require('../models/GridSubstation');
const SolarInstallation = require('../models/SolarInstallation');
const GenerationReading = require('../models/GenerationReading');

async function addTimestamps() {
    try {
        await mongoose.connect(mongodbUri);

        console.log(
            `Updating timestamps in database "${mongoose.connection.name}"`
        );

        const now = new Date();

        const provinceResult = await Province.updateMany(
            {
                createdAt: { $exists: false }
            },
            {
                $set: {
                    createdAt: now,
                    updatedAt: now
                }
            }
        );

        console.log(
            `Provinces updated: ${provinceResult.modifiedCount}`
        );

        const districtResult = await District.updateMany(
            {
                createdAt: { $exists: false }
            },
            {
                $set: {
                    createdAt: now,
                    updatedAt: now
                }
            }
        );

        console.log(
            `Districts updated: ${districtResult.modifiedCount}`
        );

        const substationResult = await GridSubstation.updateMany(
            {
                createdAt: { $exists: false }
            },
            {
                $set: {
                    createdAt: now,
                    updatedAt: now
                }
            }
        );

        console.log(
            `Substations updated: ${substationResult.modifiedCount}`
        );

        const installationResult = await SolarInstallation.updateMany(
            {
                createdAt: { $exists: false }
            },
            {
                $set: {
                    createdAt: now,
                    updatedAt: now
                }
            }
        );

        console.log(
            `Installations updated: ${installationResult.modifiedCount}`
        );

        const readingResult = await GenerationReading.updateMany(
            {
                createdAt: { $exists: false }
            },
            {
                $set: {
                    createdAt: now,
                    updatedAt: now
                }
            }
        );

        console.log(
            `Readings updated: ${readingResult.modifiedCount}`
        );

        console.log('Timestamp migration completed successfully');

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error(
            'Timestamp migration failed:',
            error.message
        );

        await mongoose.disconnect();
        process.exit(1);
    }
}

addTimestamps();