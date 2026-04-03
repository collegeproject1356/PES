const Evaluation = require('../models/Evaluation');

// Employee submits self-evaluation
exports.submitSelfEval = async (req, res) => {
    try {
        const { cycleId, managerId, selfEvaluation } = req.body;
        const evaluation = await Evaluation.create({
            employeeId: req.user._id,
            managerId,
            cycleId,
            selfEvaluation,
            status: 'Submitted by Employee'
        });
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Manager submits rating and feedback
exports.reviewEvaluation = async (req, res) => {
    try {
        const { rating, managerFeedback } = req.body;
        const evaluation = await Evaluation.findByIdAndUpdate(
            req.params.id,
            { rating, managerFeedback, status: 'Approved' },
            { new: true }
        );
        res.json(evaluation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ... (purana submitSelfEval aur reviewEvaluation yahan rahega) ...

// Employee views their own appraisal history
exports.getMyEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ employeeId: req.user._id })
            .populate('cycleId', 'name')
            .populate('managerId', 'name');
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Manager views evaluations submitted by their team
exports.getManagerEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find({ managerId: req.user._id })
            .populate('employeeId', 'name role')
            .populate('cycleId', 'name');
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin views all evaluations for reports
exports.getAllEvaluations = async (req, res) => {
    try {
        const evaluations = await Evaluation.find()
            .populate('employeeId', 'name role')
            .populate('cycleId', 'name');
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};