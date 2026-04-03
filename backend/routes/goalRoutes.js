const express = require('express');
const router = express.Router();
const { assignGoal, getMyGoals, updateGoal, deleteGoal, getManagerAssignedGoals, getAllGoals } = require('../controllers/goalController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.post('/', protect, restrictTo('Manager'), assignGoal);
router.get('/my-goals', protect, restrictTo('Employee'), getMyGoals);
router.get('/assigned', protect, restrictTo('Manager'), getManagerAssignedGoals);

router.get('/all', protect, restrictTo('Admin'), getAllGoals);

router.route('/:id')
    .put(protect, restrictTo('Manager'), updateGoal)
    .delete(protect, restrictTo('Manager'), deleteGoal);

module.exports = router;