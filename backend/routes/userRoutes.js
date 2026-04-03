const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.post('/', protect, restrictTo('Admin'), createUser);
router.put('/:id', protect, restrictTo('Admin'), updateUser);
router.delete('/:id', protect, restrictTo('Admin'), deleteUser);

router.get('/', protect, restrictTo('Admin', 'Manager'), getAllUsers);

module.exports = router;