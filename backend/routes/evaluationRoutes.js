const express = require('express');
const router = express.Router();
const { 
    submitSelfEval, reviewEvaluation, getMyEvaluations, getManagerEvaluations, getAllEvaluations 
} = require('../controllers/evaluationController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// Employee Routes
router.post('/self-eval', protect, restrictTo('Employee'), submitSelfEval);
router.get('/my-evaluations', protect, restrictTo('Employee'), getMyEvaluations);

// Manager Routes
router.put('/:id/review', protect, restrictTo('Manager'), reviewEvaluation);
router.get('/manager-evaluations', protect, restrictTo('Manager'), getManagerEvaluations);

// Admin Routes
router.get('/all', protect, restrictTo('Admin'), getAllEvaluations);

module.exports = router;