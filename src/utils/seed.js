const mongoose = require('mongoose');

const { mongodbUri } = require('../config/env');

const Province = require('../models/Province');
const District = require('../models/District');
const GridSubstation = require('../models/GridSubstation');
const SolarInstallation = require('../models/SolarInstallation');
const GenerationReading = require('../models/GenerationReading');
const User = require('../models/User');

const provinces = require('../../data/provinces.json');
const districts = require('../../data/districts.json');
const substations = require('../../data/substations.json');
const installations = require('../../data/installations.json');
const users = require('../../data/users.json');
const readings = require('../../data/readings.json');

const BATCH_SIZE = 5000;

async function seedDatabase() {
    try {
        await mongoose.connect(mongodbUri);

        console.log(
            `Seeding database "${mongoose.connection.name}"`
        );

        // Clear existing data
        await GenerationReading.deleteMany({});
        await SolarInstallation.deleteMany({});
        await GridSubstation.deleteMany({});
        await District.deleteMany({});
        await Province.deleteMany({});
        await User.deleteMany({});

        console.log('Existing data cleared');

        // Insert provinces
        await Province.insertMany(provinces);
        console.log(`Provinces: ${provinces.length}`);

        // Insert districts
        await District.insertMany(districts);
        console.log(`Districts: ${districts.length}`);

        // Insert substations
        await GridSubstation.insertMany(substations);
        console.log(`Substations: ${substations.length}`);

        // Insert installations
        await SolarInstallation.insertMany(installations);
        console.log(`Installations: ${installations.length}`);

        // Insert users
        await User.insertMany(users);
        console.log(`Users: ${users.length}`);

        // Insert readings in batches
        let inserted = 0;

        for (let i = 0; i < readings.length; i += BATCH_SIZE) {
            const batch = readings.slice(i, i + BATCH_SIZE);

            await GenerationReading.insertMany(batch);

            inserted += batch.length;

            console.log(
                `Readings: ${inserted} / ${readings.length}`
            );
        }

        console.log('Database seeding completed successfully');

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('Seed failed:', error.message);

        await mongoose.disconnect();
        process.exit(1);
    }
}

seedDatabase();