const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const openapiSpec = require('../openapi');

const provinceRoutes = require('./routes/provinceRoutes');
const districtRoutes = require('./routes/districtRoutes');
const gridSubstationRoutes = require('./routes/gridSubstationRoutes');
const solarInstallationRoutes = require('./routes/solarInstallationRoutes');
const generationReadingRoutes = require('./routes/generationReadingRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'SLSEA Solar Generation Data API'
    });
});

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(openapiSpec)
);

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