const gridSubstations = {
    '/grid-substations': {
        get: {
            tags: ['Grid Substations'],
            summary: 'Get all grid substations',
            description:
                'Returns all grid substations available in the SLSEA system.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: 'List of grid substations',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/GridSubstation'
                                }
                            }
                        }
                    }
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                }
            }
        }
    },

    '/grid-substations/{substationId}': {
        get: {
            tags: ['Grid Substations'],
            summary: 'Get a grid substation by ID',
            description:
                'Returns a single grid substation using its ID.',
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
                    description: 'Unique identifier of the grid substation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'c3d4e5f60123456789012345'
                }
            ],
            responses: {
                200: {
                    description: 'Grid substation found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/GridSubstation'
                            }
                        }
                    }
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                }
            }
        }
    },

    '/grid-substations/{substationId}/installations': {
        get: {
            tags: ['Grid Substations'],
            summary: 'Get installations in a grid substation',
            description:
                'Returns all solar installations connected to the specified grid substation.',
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
                    description: 'Unique identifier of the grid substation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'c3d4e5f60123456789012345'
                }
            ],
            responses: {
                200: {
                    description:
                        'List of solar installations connected to the substation',
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

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                }
            }
        }
    }
};

module.exports = gridSubstations;