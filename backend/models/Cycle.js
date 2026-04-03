const mongoose = require('mongoose');

const cycleSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "Q1 Performance Review 2026"
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Cycle', cycleSchema);