const { createToken } = require('./auth');

const token = createToken({
    installationId: 'd4e5f601234567890123225',
    type: 'device'
});

console.log('\nDevice token:\n');
console.log(token);
console.log();