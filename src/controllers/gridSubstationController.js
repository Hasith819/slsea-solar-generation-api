const GridSubstation = require('../models/GridSubstation');

async function getGridSubstations(req, res, next) {
    try {
        const substations = await GridSubstation.find().sort({ name: 1 });

        res.status(200).json(substations);
    } catch (error) {
        next(error);
    }
}

async function getGridSubstationById(req, res, next) {
    try {
        const substation = await GridSubstation.findById(
            req.params.substationId
        );

        if (!substation) {
            return res.status(404).json({
                code: 'SUBSTATION_NOT_FOUND',
                message: 'Grid substation not found',
                detail: `No grid substation exists with id '${req.params.substationId}'.`
            });
        }

        res.status(200).json(substation);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getGridSubstations,
    getGridSubstationById
};