const app = require('./app');
const { port } = require('./config/env');
const { connectDatabase } = require('./config/database');

async function start() {
    await connectDatabase();

    if (require.main === module) {
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

start().catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
});

module.exports = app;