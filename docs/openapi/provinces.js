const provinces = {
    '/provinces': {
        get: {
            tags: ['Provinces'],
            summary: 'Get all provinces',
            description: 'Returns all provinces available in the SLSEA system.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: 'List of provinces',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Province'
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

    '/provinces/{provinceId}': {
        get: {
            tags: ['Provinces'],
            summary: 'Get a province by ID',
            description: 'Returns a single province using its ID.',
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
                    description: 'Unique identifier of the province.',
                    schema: {
                        type: 'string'
                    },
                    example: 'a1b2c3d4e5f6012345678901'
                }
            ],
            responses: {
                200: {
                    description: 'Province found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Province'
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

    '/provinces/{provinceId}/districts': {
        get: {
            tags: ['Provinces'],
            summary: 'Get districts in a province',
            description: 'Returns all districts belonging to the specified province.',
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
                    description: 'Unique identifier of the province.',
                    schema: {
                        type: 'string'
                    },
                    example: 'a1b2c3d4e5f6012345678901'
                }
            ],
            responses: {
                200: {
                    description: 'List of districts in the province',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/District'
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

module.exports = provinces;