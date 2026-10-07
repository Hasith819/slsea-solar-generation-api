const schemas = {
    ErrorResponse: {
        type: 'object',
        required: ['code', 'message', 'detail'],
        properties: {
            code: {
                type: 'string',
                example: 'ACCESS_DENIED'
            },

            message: {
                type: 'string',
                example: 'Access denied'
            },

            detail: {
                type: 'string',
                example: 'You are not authorized to access this resource.'
            }
        }
    },

    Province: {
        type: 'object',
        required: ['_id', 'name'],
        properties: {
            _id: {
                type: 'string',
                example: 'a1b2c3d4e5f6012345678901'
            },

            name: {
                type: 'string',
                example: 'Western'
            },

            createdAt: {
                type: 'string',
                format: 'date-time'
            },

            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }
    },

    District: {
        type: 'object',
        required: ['_id', 'provinceId', 'name'],
        properties: {
            _id: {
                type: 'string',
                example: 'b2c3d4e5f601234567890123'
            },

            provinceId: {
                type: 'string',
                example: 'a1b2c3d4e5f6012345678901'
            },

            name: {
                type: 'string',
                example: 'Colombo'
            },

            createdAt: {
                type: 'string',
                format: 'date-time'
            },

            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }
    },

    GridSubstation: {
        type: 'object',
        required: ['_id', 'districtId', 'name'],
        properties: {
            _id: {
                type: 'string',
                example: 'c3d4e5f60123456789012345'
            },

            districtId: {
                type: 'string',
                example: 'b2c3d4e5f601234567890123'
            },

            name: {
                type: 'string',
                example: 'Colombo South Grid Substation'
            },

            createdAt: {
                type: 'string',
                format: 'date-time'
            },

            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }
    },

    SolarInstallation: {
        type: 'object',
        required: [
            '_id',
            'substationId',
            'name',
            'meterId',
            'capacityKw',
            'latitude',
            'longitude'
        ],

        properties: {
            _id: {
                type: 'string',
                example: 'd4e5f601234567890123225'
            },

            substationId: {
                type: 'string',
                example: 'c3d4e5f60123456789012345'
            },

            name: {
                type: 'string',
                example: 'Matara Rooftop Solar 225'
            },

            meterId: {
                type: 'string',
                example: 'SLSEA-MTR-00225'
            },

            capacityKw: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 5
            },

            latitude: {
                type: 'number',
                format: 'double',
                example: 5.9455
            },

            longitude: {
                type: 'number',
                format: 'double',
                example: 80.5503
            },

            createdAt: {
                type: 'string',
                format: 'date-time'
            },

            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }
    },

    SolarInstallationInput: {
        type: 'object',
        required: [
            '_id',
            'substationId',
            'name',
            'meterId',
            'capacityKw',
            'latitude',
            'longitude'
        ],

        properties: {
            _id: {
                type: 'string',
                example: 'd4e5f601234567890123225'
            },

            substationId: {
                type: 'string',
                example: 'c3d4e5f60123456789012345'
            },

            name: {
                type: 'string',
                example: 'Matara Rooftop Solar 225'
            },

            meterId: {
                type: 'string',
                example: 'SLSEA-MTR-00225'
            },

            capacityKw: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 5
            },

            latitude: {
                type: 'number',
                format: 'double',
                example: 5.9455
            },

            longitude: {
                type: 'number',
                format: 'double',
                example: 80.5503
            }
        }
    },

    GenerationReading: {
        type: 'object',
        required: [
            '_id',
            'installationId',
            'timestamp',
            'powerKw',
            'energyKwh',
            'voltage'
        ],

        properties: {
            _id: {
                type: 'string',
                example: 'e5f601234567890123456789'
            },

            installationId: {
                type: 'string',
                example: 'd4e5f601234567890123225'
            },

            timestamp: {
                type: 'string',
                format: 'date-time',
                example: '2026-10-08T08:30:00.000Z'
            },

            powerKw: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 3.75
            },

            energyKwh: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 1245.68
            },

            voltage: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 230.5
            },

            createdAt: {
                type: 'string',
                format: 'date-time'
            },

            updatedAt: {
                type: 'string',
                format: 'date-time'
            }
        }
    },

    GenerationReadingInput: {
        type: 'object',
        required: [
            '_id',
            'timestamp',
            'powerKw',
            'energyKwh',
            'voltage'
        ],

        properties: {
            _id: {
                type: 'string',
                example: 'e5f601234567890123456789'
            },

            timestamp: {
                type: 'string',
                format: 'date-time',
                example: '2026-10-08T08:30:00.000Z'
            },

            powerKw: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 3.75
            },

            energyKwh: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 1245.68
            },

            voltage: {
                type: 'number',
                format: 'double',
                minimum: 0,
                example: 230.5
            }
        }
    }
};

module.exports = schemas;