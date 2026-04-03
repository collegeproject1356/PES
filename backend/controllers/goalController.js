const Goal = require('../models/Goal');

// Manager assigns a goal
exports.assignGoal = async (req, res) => {
    try {
        const { employeeId, title, description, cycleId } = req.body;
        const goal = await Goal.create({
            employeeId,
            managerId: req.user._id,
            title,
            description,
            cycleId
        });
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Employee fetches their assigned goals
exports.getMyGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ employeeId: req.user._id });
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getManagerAssignedGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ managerId: req.user._id }).populate('employeeId', 'name');
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Goal
exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(goal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Goal
exports.deleteGoal = async (req, res) => {
    try {
        await Goal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.find().populate('employeeId', 'name');
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};