const express = require('express');

const provinceRoutes = require('./routes/provinceRoutes');
const districtRoutes = require('./routes/districtRoutes');
const gridSubstationRoutes = require('./routes/gridSubstationRoutes');
const solarInstallationRoutes = require('./routes/solarInstallationRoutes');
const generationReadingRoutes = require('./routes/generationReadingRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'SLSEA Solar Generation Data API'
    });
});

app.use('/provinces', provinceRoutes);
app.use('/districts', districtRoutes);
app.use('/grid-substations', gridSubstationRoutes);
app.use('/installations', solarInstallationRoutes);
app.use('/readings', generationReadingRoutes);


module.exports = app;