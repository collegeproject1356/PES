const Cycle = require('../models/Cycle');

// Admin creates a new cycle
exports.createCycle = async (req, res) => {
    try {
        const { name, startDate, endDate } = req.body;
        const cycle = await Cycle.create({ name, startDate, endDate });
        res.status(201).json(cycle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all cycles
exports.getCycles = async (req, res) => {
    try {
        const cycles = await Cycle.find().sort({ createdAt: -1 });
        res.json(cycles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCycle = async (req, res) => {
    try {
        const cycle = await Cycle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(cycle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Cycle
exports.deleteCycle = async (req, res) => {
    try {
        await Cycle.findByIdAndDelete(req.params.id);
        res.json({ message: 'Cycle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};