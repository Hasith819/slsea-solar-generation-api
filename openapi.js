const swaggerJsdoc = require('swagger-jsdoc');

const schemas = require('./docs/openapi/schemas');
const responses = require('./docs/openapi/responses');
const authentication = require('./docs/openapi/authentication');
const provinces = require('./docs/openapi/provinces');
const districts = require('./docs/openapi/districts');
const gridSubstations = require('./docs/openapi/gridSubstations');
const installations = require('./docs/openapi/installations');
const readings = require('./docs/openapi/readings');

const options = {
    definition: {
        openapi: '3.0.3',

        info: {
            title: 'SLSEA Solar Generation Data API',
            version: '1.0.0',
            description:
                'REST API for real-time and historical solar generation data for the Sri Lanka Sustainable Energy Authority (SLSEA).'
        },

        servers: [
            {
                url: '/',
                description: 'Current deployment origin'
            }
        ],

        tags: [
            {
                name: 'Authentication',
                description: 'User authentication'
            },
            {
                name: 'Provinces',
                description: 'Province resources'
            },
            {
                name: 'Districts',
                description: 'District resources'
            },
            {
                name: 'Grid Substations',
                description: 'Grid substation resources'
            },
            {
                name: 'Solar Installations',
                description: 'Solar installation resources'
            },
            {
                name: 'Generation Readings',
                description: 'Solar generation reading resources'
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },

            schemas,

            responses
        },

        paths: {
            ...authentication,
            ...provinces,
            ...districts,
            ...gridSubstations,
            ...installations,
            ...readings
        }
    },

    apis: []
};

const openapiSpec = swaggerJsdoc(options);

module.exports = openapiSpec;