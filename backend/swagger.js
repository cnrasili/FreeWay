const swaggerJsdoc = require('swagger-jsdoc');

// Full OpenAPI spec defined here — keeps route files clean
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FreeWay API',
      version: '1.0.0',
      description: 'REST API for FreeWay — Istanbul public transit route planner.',
    },
    servers: [{ url: 'http://localhost:3000' }],
    tags: [
      { name: 'Lines',    description: 'Transit line management' },
      { name: 'Stations', description: 'Station management' },
      { name: 'Routes',   description: 'Route finding and transfer points' },
    ],
    paths: {
      '/api/lines': {
        get: {
          tags: ['Lines'],
          summary: 'Get all lines',
          parameters: [{
            in: 'query', name: 'type', schema: { type: 'string', enum: ['metro', 'tram', 'metrobus', 'marmaray', 'funicular', 'cablecar'] },
            description: 'Filter by line type',
          }],
          responses: { 200: { description: 'List of lines', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Line' } } } } } },
        },
        post: {
          tags: ['Lines'],
          summary: 'Create a new line',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object', required: ['name', 'type'],
                  properties: {
                    name:        { type: 'string',  example: 'M2 Yenikapı-Hacıosman' },
                    type:        { type: 'string',  enum: ['metro', 'tram', 'metrobus', 'marmaray', 'funicular', 'cablecar'] },
                    color:       { type: 'string',  example: '#00A651' },
                    description: { type: 'string',  example: 'Green metro line.' },
                    is_active:   { type: 'integer', enum: [0, 1] },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Line created',     content: { 'application/json': { schema: { $ref: '#/components/schemas/Line' } } } },
            400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
          },
        },
      },
      '/api/lines/{id}': {
        get: {
          tags: ['Lines'], summary: 'Get a line by ID',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Line found',     content: { 'application/json': { schema: { $ref: '#/components/schemas/Line' } } } },
            404: { description: 'Line not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        put: {
          tags: ['Lines'], summary: 'Update a line',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name:        { type: 'string' },
                    type:        { type: 'string', enum: ['metro', 'tram', 'metrobus', 'marmaray', 'funicular', 'cablecar'] },
                    color:       { type: 'string' },
                    description: { type: 'string' },
                    is_active:   { type: 'integer', enum: [0, 1] },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Line updated',    content: { 'application/json': { schema: { $ref: '#/components/schemas/Line' } } } },
            400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
            404: { description: 'Line not found',  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        delete: {
          tags: ['Lines'], summary: 'Delete a line',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Line deleted',   content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' } } } } } },
            404: { description: 'Line not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/lines/{lineId}/stations': {
        get: {
          tags: ['Lines'], summary: 'Get ordered stations of a line',
          parameters: [{ in: 'path', name: 'lineId', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'List of stations', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Station' } } } } },
            404: { description: 'Line not found',   content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/stations': {
        get: {
          tags: ['Stations'], summary: 'Get all stations with optional name search',
          parameters: [{ in: 'query', name: 'q', schema: { type: 'string' }, description: 'Search term' }],
          responses: { 200: { description: 'List of stations', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Station' } } } } } },
        },
        post: {
          tags: ['Stations'], summary: 'Create a new station',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object', required: ['name', 'line_id', 'order_number'],
                  properties: {
                    name:         { type: 'string',  example: 'Taksim' },
                    line_id:      { type: 'integer', example: 3 },
                    order_number: { type: 'integer', example: 5 },
                    district:     { type: 'string',  example: 'Beyoğlu' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Station created',  content: { 'application/json': { schema: { $ref: '#/components/schemas/Station' } } } },
            400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
            404: { description: 'Line not found',   content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/stations/{id}': {
        get: {
          tags: ['Stations'], summary: 'Get a station by ID',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Station found',     content: { 'application/json': { schema: { $ref: '#/components/schemas/Station' } } } },
            404: { description: 'Station not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        put: {
          tags: ['Stations'], summary: 'Update a station',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name:         { type: 'string' },
                    line_id:      { type: 'integer' },
                    order_number: { type: 'integer' },
                    district:     { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Station updated',   content: { 'application/json': { schema: { $ref: '#/components/schemas/Station' } } } },
            400: { description: 'Validation error',  content: { 'application/json': { schema: { $ref: '#/components/schemas/ValidationError' } } } },
            404: { description: 'Station not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
        delete: {
          tags: ['Stations'], summary: 'Delete a station',
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
          responses: {
            200: { description: 'Station deleted',   content: { 'application/json': { schema: { type: 'object', properties: { message: { type: 'string' } } } } } },
            404: { description: 'Station not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/routes': {
        get: {
          tags: ['Routes'], summary: 'Find the least-transfer route between two stations',
          parameters: [
            { in: 'query', name: 'from', required: true, schema: { type: 'string' }, example: 'Taksim' },
            { in: 'query', name: 'to',   required: true, schema: { type: 'string' }, example: 'Kadıköy' },
          ],
          responses: {
            200: { description: 'Route found',              content: { 'application/json': { schema: { $ref: '#/components/schemas/RouteResult' } } } },
            400: { description: 'Missing query parameters', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            404: { description: 'No route found',           content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/transfers': {
        get: {
          tags: ['Routes'], summary: 'Get all transfer points in the network',
          responses: { 200: { description: 'List of transfer points', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/TransferPoint' } } } } } },
        },
      },
    },
    components: {
      schemas: {
        Line: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 3 },
            name:        { type: 'string',  example: 'M2 Yenikapı-Hacıosman' },
            type:        { type: 'string',  enum: ['metro', 'tram', 'metrobus', 'marmaray', 'funicular', 'cablecar'] },
            color:       { type: 'string',  example: '#00A651' },
            description: { type: 'string',  example: 'Green metro line.' },
            is_active:   { type: 'integer', enum: [0, 1] },
            created_at:  { type: 'string',  example: '2026-01-01 00:00:00' },
            updated_at:  { type: 'string',  example: '2026-01-01 00:00:00' },
          },
        },
        Station: {
          type: 'object',
          properties: {
            id:           { type: 'integer', example: 36 },
            name:         { type: 'string',  example: 'Taksim' },
            line_id:      { type: 'integer', example: 3 },
            order_number: { type: 'integer', example: 5 },
            district:     { type: 'string',  example: 'Beyoğlu' },
            created_at:   { type: 'string',  example: '2026-01-01 00:00:00' },
            updated_at:   { type: 'string',  example: '2026-01-01 00:00:00' },
          },
        },
        RouteStep: {
          type: 'object',
          properties: {
            station: { type: 'string',  example: 'Taksim' },
            lineId:  { type: 'integer', example: 3 },
            action:  { type: 'string',  enum: ['board', 'ride', 'transfer', 'arrive'] },
          },
        },
        RouteResult: {
          type: 'object',
          properties: {
            found:     { type: 'boolean', example: true },
            transfers: { type: 'integer', example: 1 },
            steps:     { type: 'array',   items: { $ref: '#/components/schemas/RouteStep' } },
          },
        },
        TransferPoint: {
          type: 'object',
          properties: {
            name:      { type: 'string',  example: 'Yenikapı' },
            lineCount: { type: 'integer', example: 3 },
          },
        },
        Error: {
          type: 'object',
          properties: { error: { type: 'string', example: 'Line not found.' } },
        },
        ValidationError: {
          type: 'object',
          properties: { errors: { type: 'array', items: { type: 'string' } } },
        },
      },
    },
  },
  apis: [],
};

module.exports = swaggerJsdoc(options);
