const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'SLSEA Solar Generation Data API'
    });
});

module.exports = app;