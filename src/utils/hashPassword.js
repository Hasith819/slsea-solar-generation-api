const bcrypt = require('bcryptjs');

async function main() {
    const password = 'Password123!';

    const hash = await bcrypt.hash(password, 10);

    console.log('Password:', password);
    console.log('Hash:', hash);
}

main();