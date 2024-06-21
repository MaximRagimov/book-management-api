const express = require('express');
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { ADMIN } = require('../utils/roleUtils');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware(ADMIN), bookController.create);
router.get('/', bookController.findAll);
router.get('/:id', bookController.findById);
router.put('/:id', authMiddleware, roleMiddleware(ADMIN), bookController.update);
router.delete('/:id', authMiddleware, roleMiddleware(ADMIN), bookController.delete);

module.exports = router;