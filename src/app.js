const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const openapiSpec = require('../openapi');

const provinceRoutes = require('./routes/provinceRoutes');
const districtRoutes = require('./routes/districtRoutes');
const gridSubstationRoutes = require('./routes/gridSubstationRoutes');
const solarInstallationRoutes = require('./routes/solarInstallationRoutes');
const generationReadingRoutes = require('./routes/generationReadingRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", 'https://unpkg.com', "'unsafe-inline'"],
                styleSrc: ["'self'", 'https://unpkg.com', "'unsafe-inline'"],
                imgSrc: ["'self'", 'data:'],
                connectSrc: ["'self'", 'https://unpkg.com'],
                fontSrc: ["'self'", 'data:']
            }
        }
    })
);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'SLSEA Solar Generation Data API'
    });
});

app.get('/openapi.json', (req, res) => {
    res.json(openapiSpec);
});

app.get('/api-docs', (req, res) => {
    res.type('html').send(`<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SLSEA Solar Generation Data API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
        html { box-sizing: border-box; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin: 0; background: #fafafa; }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            window.ui = SwaggerUIBundle({
                url: '/openapi.json',
                dom_id: '#swagger-ui',
                deepLinking: false,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                layout: 'BaseLayout'
            });
        };
    </script>
</body>
</html>`);
});

app.use('/auth', authRoutes);

app.use('/provinces', provinceRoutes);
app.use('/districts', districtRoutes);
app.use('/grid-substations', gridSubstationRoutes);
app.use('/installations', solarInstallationRoutes);
app.use('/readings', generationReadingRoutes);

app.use((req, res) => {
    res.status(404).json({
        code: 'ROUTE_NOT_FOUND',
        message: 'Route not found',
        detail: `No API route exists for ${req.method} ${req.originalUrl}.`
    });
});


app.use(errorHandler);

module.exports = app;