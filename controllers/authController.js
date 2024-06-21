// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { secret, expiresIn } = require('../config/jwt');
const emailService = require('../utils/emailService');

const authController = {
    async register(req, res) {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create(username, hashedPassword, email, 1); // default role
        emailService.sendConfirmationEmail(email);
        res.json(newUser);
    },

    async login(req, res) {
        const { username, password } = req.body;
        const user = await User.findByUsername(username);

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn });
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    },

    async me(req, res) {
        const user = await User.findById(req.user.id);
        res.json(user);
    },
};

module.exports = authController;