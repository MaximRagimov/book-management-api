const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { ADMIN } = require('../utils/roleUtils');

const router = express.Router();

router.put('/:id/role', authMiddleware, roleMiddleware(ADMIN), userController.updateRole);

module.exports = router;