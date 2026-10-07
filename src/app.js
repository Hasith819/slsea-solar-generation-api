const express = require('express');

const provinceRoutes = require('./routes/provinceRoutes');
const districtRoutes = require('./routes/districtRoutes');
const gridSubstationRoutes = require('./routes/gridSubstationRoutes');
const solarInstallationRoutes = require('./routes/solarInstallationRoutes');
const generationReadingRoutes = require('./routes/generationReadingRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'SLSEA Solar Generation Data API'
    });
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