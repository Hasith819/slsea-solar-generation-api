const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { createToken } = require('../utils/auth');

async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                code: 'INVALID_LOGIN',
                message: 'Email and password are required',
                detail: 'Both email and password must be provided.'
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid credentials',
                detail: 'The email or password is incorrect.'
            });
        }

        const passwordMatches = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordMatches) {
            return res.status(401).json({
                code: 'INVALID_CREDENTIALS',
                message: 'Invalid credentials',
                detail: 'The email or password is incorrect.'
            });
        }

        const token = createToken({
            userId: user._id,
            role: user.role,
            jurisdictionType: user.jurisdictionType,
            jurisdictionId: user.jurisdictionId
        });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                jurisdictionType: user.jurisdictionType,
                jurisdictionId: user.jurisdictionId
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login
};