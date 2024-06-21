const User = require('../models/userModel');
const { isAdmin } = require('../utils/roleUtils');

const userController = {
    async updateRole(req, res) {
        const { role } = req.body;
        const updatedUser = await User.updateRole(req.params.id, role);
        res.json(updatedUser);
    },
};

module.exports = userController;