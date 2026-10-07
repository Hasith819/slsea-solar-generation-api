const installations = {
    '/installations': {
        get: {
            tags: ['Solar Installations'],
            summary: 'Get solar installations',
            description:
                'Returns solar installations available to the authenticated user according to their jurisdiction.',
            security: [
                {
                    bearerAuth: []
                }
            ],
            responses: {
                200: {
                    description: 'List of solar installations',
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

                403: {
                    $ref: '#/components/responses/Forbidden'
                }
            }
        },

        post: {
            tags: ['Solar Installations'],
            summary: 'Create a solar installation',
            description:
                'Creates a new solar installation. The authenticated user must have permission to create an installation within the selected substation jurisdiction.',
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
                201: {
                    description: 'Solar installation created successfully',
                    headers: {
                        Location: {
                            description:
                                'URL of the newly created solar installation.',
                            schema: {
                                type: 'string',
                                example:
                                    '/installations/d4e5f601234567890123225'
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

                400: {
                    $ref: '#/components/responses/BadRequest'
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                403: {
                    $ref: '#/components/responses/Forbidden'
                },

                409: {
                    $ref: '#/components/responses/Conflict'
                }
            }
        }
    },

    '/installations/{installationId}': {
        get: {
            tags: ['Solar Installations'],
            summary: 'Get a solar installation by ID',
            description:
                'Returns a single solar installation if it is within the authenticated user jurisdiction.',
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
                    description:
                        'Unique identifier of the solar installation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'd4e5f601234567890123225'
                }
            ],
            responses: {
                200: {
                    description: 'Solar installation found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SolarInstallation'
                            }
                        }
                    }
                },

                304: {
                    $ref: '#/components/responses/NotModified'
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
        },

        put: {
            tags: ['Solar Installations'],
            summary: 'Update a solar installation',
            description:
                'Updates an existing solar installation. Province and district users cannot move an installation outside their jurisdiction.',
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
                    description:
                        'Unique identifier of the solar installation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'd4e5f601234567890123225'
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
                200: {
                    description: 'Solar installation updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/SolarInstallation'
                            }
                        }
                    }
                },

                400: {
                    $ref: '#/components/responses/BadRequest'
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                403: {
                    $ref: '#/components/responses/Forbidden'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                },

                409: {
                    $ref: '#/components/responses/Conflict'
                }
            }
        },

        delete: {
            tags: ['Solar Installations'],
            summary: 'Delete a solar installation',
            description:
                'Deletes a solar installation only when it has no associated generation readings.',
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
                    description:
                        'Unique identifier of the solar installation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'd4e5f601234567890123225'
                }
            ],
            responses: {
                204: {
                    description:
                        'Solar installation deleted successfully.'
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                403: {
                    $ref: '#/components/responses/Forbidden'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                },

                409: {
                    $ref: '#/components/responses/Conflict'
                }
            }
        }
    },

    '/installations/{installationId}/readings/latest': {
        get: {
            tags: ['Generation Readings'],
            summary: 'Get the latest generation reading',
            description:
                'Returns the most recent generation reading for a solar installation.',
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
                    description:
                        'Unique identifier of the solar installation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'd4e5f601234567890123225'
                }
            ],
            responses: {
                200: {
                    description: 'Latest generation reading',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/GenerationReading'
                            }
                        }
                    }
                },

                304: {
                    $ref: '#/components/responses/NotModified'
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
    },

    '/installations/{installationId}/readings': {
        get: {
            tags: ['Generation Readings'],
            summary: 'Get readings for a solar installation',
            description:
                'Returns generation readings belonging to the specified solar installation.',
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
                    description:
                        'Unique identifier of the solar installation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'd4e5f601234567890123225'
                }
            ],
            responses: {
                200: {
                    description: 'List of generation readings',
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
        },

        post: {
            tags: ['Generation Readings'],
            summary: 'Submit a generation reading',
            description:
                'Submits a new generation reading for the specified solar installation. The authenticated device must be assigned to the same installation. Reusing the same reading ID with the same payload is treated as an idempotent request.',
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
                    description:
                        'Unique identifier of the solar installation.',
                    schema: {
                        type: 'string'
                    },
                    example: 'd4e5f601234567890123225'
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
                201: {
                    description: 'Generation reading created successfully',
                    headers: {
                        Location: {
                            description:
                                'URL of the newly created generation reading.',
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

                200: {
                    description:
                        'The reading ID already exists with the same payload. The existing reading is returned.',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/GenerationReading'
                            }
                        }
                    }
                },

                400: {
                    $ref: '#/components/responses/BadRequest'
                },

                401: {
                    $ref: '#/components/responses/Unauthorized'
                },

                403: {
                    $ref: '#/components/responses/Forbidden'
                },

                404: {
                    $ref: '#/components/responses/NotFound'
                },

                409: {
                    $ref: '#/components/responses/Conflict'
                }
            }
        }
    }
};

module.exports = installations;