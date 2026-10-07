const readings = {
    '/readings': {
        get: {
            tags: ['Generation Readings'],
            summary: 'Get generation readings',
            description:
                'Returns paginated generation readings. Results are filtered according to the authenticated user jurisdiction and can be filtered by time range and sorted by timestamp.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    description: 'Page number.',
                    required: false,
                    schema: {
                        type: 'integer',
                        minimum: 1,
                        default: 1
                    },
                    example: 1
                },
                {
                    name: 'limit',
                    in: 'query',
                    description: 'Number of readings per page.',
                    required: false,
                    schema: {
                        type: 'integer',
                        minimum: 1,
                        maximum: 100,
                        default: 20
                    },
                    example: 20
                },
                {
                    name: 'sort',
                    in: 'query',
                    description: 'Sort readings by timestamp.',
                    required: false,
                    schema: {
                        type: 'string',
                        enum: ['asc', 'desc'],
                        default: 'desc'
                    },
                    example: 'desc'
                },
                {
                    name: 'from',
                    in: 'query',
                    description:
                        'Return readings from this date/time onwards.',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date-time'
                    },
                    example: '2026-10-01T00:00:00.000Z'
                },
                {
                    name: 'to',
                    in: 'query',
                    description:
                        'Return readings up to this date/time.',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date-time'
                    },
                    example: '2026-10-08T23:59:59.000Z'
                }
            ],
            responses: {
                200: {
                    description: 'Paginated generation readings',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['data', 'pagination'],
                                properties: {
                                    data: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/GenerationReading'
                                        }
                                    },
                                    pagination: {
                                        type: 'object',
                                        required: [
                                            'page',
                                            'limit',
                                            'total',
                                            'totalPages'
                                        ],
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
                                                example: null
                                            },
                                            next: {
                                                type: 'string',
                                                nullable: true,
                                                example:
                                                    'http://localhost:3000/readings?page=2&limit=20'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

                400: {
                    $ref: '#/components/responses/BadRequest'
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                }
            }
        }
    },

    '/readings/{readingId}': {
        get: {
            tags: ['Generation Readings'],
            summary: 'Get a generation reading by ID',
            description:
                'Returns a single generation reading using its unique ID.',
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
                    description:
                        'Unique identifier of the generation reading.',
                    schema: {
                        type: 'string'
                    },
                    example: 'e5f601234567890123456789'
                }
            ],
            responses: {
                200: {
                    description: 'Generation reading found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/GenerationReading'
                            }
                        }
                    }
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                403: {
                    $ref: '#/components/responses/Forbidden'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                }
            }
        }
    }
};

module.exports = readings;