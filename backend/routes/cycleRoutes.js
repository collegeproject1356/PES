const express = require('express');
const router = express.Router();
const { createCycle, getCycles, updateCycle, deleteCycle } = require('../controllers/cycleController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.route('/')
    .post(protect, restrictTo('Admin'), createCycle)
    .get(protect, getCycles);

router.route('/:id')
    .put(protect, restrictTo('Admin'), updateCycle)
    .delete(protect, restrictTo('Admin'), deleteCycle);

module.exports = router;