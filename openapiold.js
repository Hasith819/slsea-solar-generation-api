const swaggerJsdoc = require('swagger-jsdoc');

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
                url: 'http://localhost:3000',
                description: 'Local development server'
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

            schemas: {
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
},
            }
        },

        paths: {
            '/auth/login': {
                post: {
                    tags: ['Authentication'],

                    summary: 'Login user',

                    description:
                        'Authenticates an SLSEA user and returns a JWT access token.',

                    requestBody: {
                        required: true,

                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',

                                    required: ['email', 'password'],

                                    properties: {
                                        email: {
                                            type: 'string',
                                            format: 'email',
                                            example: 'admin@slsea.lk'
                                        },

                                        password: {
                                            type: 'string',
                                            format: 'password',
                                            example: 'Password123!'
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        '200': {
                            description: 'Login successful',

                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',

                                        properties: {
                                            token: {
                                                type: 'string',
                                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                                            },

                                            user: {
                                                type: 'object',

                                                properties: {
                                                    id: {
                                                        type: 'string',
                                                        example: 'a1b2c3d4e5f6012345678901'
                                                    },

                                                    email: {
                                                        type: 'string',
                                                        format: 'email',
                                                        example: 'admin@slsea.lk'
                                                    },

                                                    role: {
                                                        type: 'string',
                                                        enum: [
                                                            'national',
                                                            'province',
                                                            'district'
                                                        ],
                                                        example: 'national'
                                                    },

                                                    jurisdictionType: {
                                                        type: 'string',
                                                        enum: [
                                                            'national',
                                                            'province',
                                                            'district'
                                                        ],
                                                        example: 'national'
                                                    },

                                                    jurisdictionId: {
                                                        type: 'string',
                                                        nullable: true,
                                                        example: null
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },

                        '400': {
                            description: 'Email or password was not provided',

                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        },

                        '401': {
                            description: 'Invalid credentials',

                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },

            '/provinces': {
                get: {
                    tags: ['Provinces'],
                    summary: 'Get all provinces',
                    description: 'Returns provinces accessible to the authenticated user.',

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    responses: {
                        '200': {
                            description: 'List of provinces returned successfully',

                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',

                                        items: {
                                            type: 'object',

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
                                        }
                                    }
                                }
                            }
                        },

                        '401': {
                            description: 'Authentication required',

                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },

            '/provinces/{provinceId}': {
                get: {
                    tags: ['Provinces'],
                    summary: 'Get province by ID',

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    parameters: [
                        {
                            name: 'provinceId',
                            in: 'path',
                            required: true,
                            description: 'Unique identifier of the province',
                            schema: {
                                type: 'string'
                            },
                            example: 'a1b2c3d4e5f6012345678901'
                        }
                    ],

                    responses: {
                        '200': {
                            description: 'Province returned successfully',

                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',

                                        properties: {
                                            _id: {
                                                type: 'string'
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
                                    }
                                }
                            }
                        },

                        '401': {
                            description: 'Authentication required',

                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        },

                        '404': {
                            description: 'Province not found',

                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },

            '/provinces/{provinceId}/districts': {
                get: {
                    tags: ['Provinces'],
                    summary: 'Get districts in a province',

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    parameters: [
                        {
                            name: 'provinceId',
                            in: 'path',
                            required: true,
                            description: 'Unique identifier of the province',
                            schema: {
                                type: 'string'
                            },
                            example: 'a1b2c3d4e5f6012345678901'
                        }
                    ],

                    responses: {
                        '200': {
                            description: 'Districts returned successfully',

                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',

                                        items: {
                                            type: 'object',

                                            properties: {
                                                _id: {
                                                    type: 'string'
                                                },

                                                provinceId: {
                                                    type: 'string'
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
                                        }
                                    }
                                }
                            }
                        },

                        '401': {
                            description: 'Authentication required',

                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        },

                        '404': {
                            description: 'Province not found',

                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ErrorResponse'
                                    }
                                }
                            }
                        }
                    }
                }
            },

            '/districts': {
                get: {
                    tags: ['Districts'],
                    summary: 'Get all districts',
                    description: 'Returns districts accessible to the authenticated user.',

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    responses: {
                        '200': {
                            description: 'List of districts returned successfully',

                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',

                                        items: {
                                            type: 'object',

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
                                        }
                                    }
                                }
                            }
                        },

                    '401': {
                        description: 'Authentication required',

                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/districts/{districtId}': {
            get: {
                tags: ['Districts'],
                summary: 'Get district by ID',

                security: [
                    {
                        bearerAuth: []
                    }
                ],

                parameters: [
                    {
                        name: 'districtId',
                        in: 'path',
                        required: true,
                        description: 'Unique identifier of the district',
                        schema: {
                            type: 'string'
                        },
                        example: 'b2c3d4e5f601234567890123'
                    }
                ],

                responses: {
                    '200': {
                        description: 'District returned successfully',

                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',

                                    properties: {
                                        _id: {
                                            type: 'string'
                                        },

                                        provinceId: {
                                            type: 'string'
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
                                }
                            }
                        }
                    },

                    '401': {
                        description: 'Authentication required',

                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                }
                            }
                        }
                    },

                    '404': {
                        description: 'District not found',

                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/districts/{districtId}/substations': {
            get: {
                tags: ['Districts'],
                summary: 'Get substations in a district',

                security: [
                    {
                        bearerAuth: []
                    }
                ],

                parameters: [
                    {
                        name: 'districtId',
                        in: 'path',
                        required: true,
                        description: 'Unique identifier of the district',
                        schema: {
                            type: 'string'
                        },
                        example: 'b2c3d4e5f601234567890123'
                    }
                ],

                responses: {
                    '200': {
                        description: 'Grid substations returned successfully',

                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',

                                    items: {
                                        type: 'object',

                                        properties: {
                                            _id: {
                                                type: 'string'
                                            },

                                            districtId: {
                                                type: 'string'
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
                                    }
                                }
                            }
                        }
                    },

                    '401': {
                        description: 'Authentication required',

                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                }
                            }
                        }
                    },

                    '404': {
                        description: 'District not found',

                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ErrorResponse'
                                }
                            }
                        }
                    }
                }
            }
        },

        '/grid-substations': {
    get: {
        tags: ['Grid Substations'],
        summary: 'Get all grid substations',
        description:
            'Returns grid substations accessible to the authenticated user.',

        security: [
            {
                bearerAuth: []
            }
        ],

        responses: {
            '200': {
                description: 'List of grid substations returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            type: 'array',

                            items: {
                                type: 'object',

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
                            }
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/grid-substations/{substationId}': {
    get: {
        tags: ['Grid Substations'],
        summary: 'Get grid substation by ID',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'substationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the grid substation',
                schema: {
                    type: 'string'
                },
                example: 'c3d4e5f60123456789012345'
            }
        ],

        responses: {
            '200': {
                description: 'Grid substation returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            type: 'object',

                            properties: {
                                _id: {
                                    type: 'string'
                                },

                                districtId: {
                                    type: 'string'
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
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Grid substation not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/grid-substations/{substationId}/installations': {
    get: {
        tags: ['Grid Substations'],
        summary: 'Get installations in a grid substation',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'substationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the grid substation',
                schema: {
                    type: 'string'
                },
                example: 'c3d4e5f60123456789012345'
            }
        ],

        responses: {
            '200': {
                description: 'Solar installations returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            type: 'array',

                            items: {
                                type: 'object',

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
                                        example: 2
                                    },

                                    latitude: {
                                        type: 'number',
                                        example: 5.9455
                                    },

                                    longitude: {
                                        type: 'number',
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
                            }
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Grid substation not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/installations': {
    get: {
        tags: ['Solar Installations'],
        summary: 'Get solar installations',
        description:
            'Returns solar installations accessible to the authenticated user based on jurisdiction.',

        security: [
            {
                bearerAuth: []
            }
        ],

        responses: {
            '200': {
                description: 'Solar installations returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            type: 'array',

                            items: {
                                $ref: '#/components/schemas/SolarInstallation'
                            }
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    },

    post: {
        tags: ['Solar Installations'],
        summary: 'Create a solar installation',
        description:
            'Creates a new solar installation under a grid substation within the authenticated user jurisdiction.',

        security: [
            {
                bearerAuth: []
            }
        ],

        requestBody: {
            required: true,

            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/SolarInstallationInput'
                    }
                }
            }
        },

        responses: {
            '201': {
                description: 'Solar installation created successfully',

                headers: {
                    Location: {
                        description: 'URL of the newly created installation',
                        schema: {
                            type: 'string',
                            example: '/installations/d4e5f601234567890123225'
                        }
                    }
                },

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/SolarInstallation'
                        }
                    }
                }
            },

            '400': {
                description: 'Invalid installation data',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '409': {
                description: 'Duplicate resource',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/installations/{installationId}': {
    get: {
        tags: ['Solar Installations'],
        summary: 'Get solar installation by ID',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'installationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the solar installation',
                schema: {
                    type: 'string'
                }
            }
        ],

        responses: {
            '200': {
                description: 'Solar installation returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/SolarInstallation'
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Solar installation not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    },

    put: {
        tags: ['Solar Installations'],
        summary: 'Update a solar installation',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'installationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the solar installation',
                schema: {
                    type: 'string'
                }
            }
        ],

        requestBody: {
            required: true,

            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/SolarInstallationInput'
                    }
                }
            }
        },

        responses: {
            '200': {
                description: 'Solar installation updated successfully',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/SolarInstallation'
                        }
                    }
                }
            },

            '400': {
                description: 'Invalid installation data',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Solar installation not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '409': {
                description: 'Duplicate resource',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    },

    delete: {
        tags: ['Solar Installations'],
        summary: 'Delete a solar installation',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'installationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the solar installation',
                schema: {
                    type: 'string'
                }
            }
        ],

        responses: {
            '204': {
                description: 'Solar installation deleted successfully'
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Solar installation not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '409': {
                description: 'Installation has generation readings and cannot be deleted',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/installations/{installationId}/readings/latest': {
    get: {
        tags: ['Solar Installations'],
        summary: 'Get latest generation reading for an installation',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'installationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the solar installation',
                schema: {
                    type: 'string'
                }
            }
        ],

        responses: {
            '200': {
                description: 'Latest generation reading returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GenerationReading'
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Installation or generation reading not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/installations/{installationId}/readings': {
    get: {
        tags: ['Solar Installations'],
        summary: 'Get generation readings for an installation',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'installationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the solar installation',
                schema: {
                    type: 'string'
                }
            }
        ],

        responses: {
            '200': {
                description: 'Generation readings returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            type: 'array',

                            items: {
                                $ref: '#/components/schemas/GenerationReading'
                            }
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Solar installation not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},
'/readings': {
    get: {
        tags: ['Generation Readings'],
        summary: 'Get generation readings',
        description:
            'Returns generation readings accessible to the authenticated user with pagination, date filtering and sorting.',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'page',
                in: 'query',
                required: false,
                description: 'Page number. Defaults to 1.',
                schema: {
                    type: 'integer',
                    minimum: 1,
                    default: 1
                }
            },

            {
                name: 'limit',
                in: 'query',
                required: false,
                description: 'Number of readings per page. Maximum is 100.',
                schema: {
                    type: 'integer',
                    minimum: 1,
                    maximum: 100,
                    default: 20
                }
            },

            {
                name: 'sort',
                in: 'query',
                required: false,
                description: 'Sort readings by timestamp.',
                schema: {
                    type: 'string',
                    enum: ['asc', 'desc'],
                    default: 'desc'
                }
            },

            {
                name: 'from',
                in: 'query',
                required: false,
                description: 'Return readings from this date/time.',
                schema: {
                    type: 'string',
                    format: 'date-time'
                }
            },

            {
                name: 'to',
                in: 'query',
                required: false,
                description: 'Return readings up to this date/time.',
                schema: {
                    type: 'string',
                    format: 'date-time'
                }
            }
        ],

        responses: {
            '200': {
                description: 'Generation readings returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            type: 'object',

                            properties: {
                                data: {
                                    type: 'array',

                                    items: {
                                        $ref: '#/components/schemas/GenerationReading'
                                    }
                                },

                                pagination: {
                                    type: 'object',

                                    properties: {
                                        page: {
                                            type: 'integer',
                                            example: 1
                                        },

                                        limit: {
                                            type: 'integer',
                                            example: 20
                                        },

                                        total: {
                                            type: 'integer',
                                            example: 151200
                                        },

                                        totalPages: {
                                            type: 'integer',
                                            example: 7560
                                        },

                                        previous: {
                                            type: 'string',
                                            nullable: true,
                                            example:
                                                'http://localhost:3000/readings?page=1&limit=20'
                                        },

                                        next: {
                                            type: 'string',
                                            nullable: true,
                                            example:
                                                'http://localhost:3000/readings?page=3&limit=20'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },

            '400': {
                description: 'Invalid query parameters',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/readings/{readingId}': {
    get: {
        tags: ['Generation Readings'],
        summary: 'Get generation reading by ID',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'readingId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the generation reading',
                schema: {
                    type: 'string'
                }
            }
        ],

        responses: {
            '200': {
                description: 'Generation reading returned successfully',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GenerationReading'
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description: 'Access denied',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Generation reading not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

'/installations/{installationId}/readings': {
    post: {
        tags: ['Generation Readings'],
        summary: 'Submit a generation reading',
        description:
            'Accepts a generation reading from an authenticated device assigned to the specified solar installation. The device can only submit readings for its own installation.',

        security: [
            {
                bearerAuth: []
            }
        ],

        parameters: [
            {
                name: 'installationId',
                in: 'path',
                required: true,
                description: 'Unique identifier of the solar installation',
                schema: {
                    type: 'string'
                }
            }
        ],

        requestBody: {
            required: true,

            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/GenerationReadingInput'
                    }
                }
            }
        },

        responses: {
            '201': {
                description: 'Generation reading created successfully',

                headers: {
                    Location: {
                        description: 'URL of the newly created generation reading',
                        schema: {
                            type: 'string',
                            example:
                                '/readings/e5f601234567890123456789'
                        }
                    }
                },

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GenerationReading'
                        }
                    }
                }
            },

            '200': {
                description:
                    'The same generation reading already exists with identical data',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/GenerationReading'
                        }
                    }
                }
            },

            '400': {
                description: 'Invalid generation reading data',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '401': {
                description: 'Authentication required',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '403': {
                description:
                    'Device is not authorized to submit readings for this installation',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '404': {
                description: 'Solar installation not found',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            },

            '409': {
                description:
                    'A reading with the same ID already exists with different data',

                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
},

        }
    },

    apis: []
};

const openapiSpec = swaggerJsdoc(options);

module.exports = openapiSpec;