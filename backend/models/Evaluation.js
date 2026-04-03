const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cycleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cycle', required: true },
    selfEvaluation: { type: String }, // Employee's feedback
    managerFeedback: { type: String }, // Manager's feedback
    rating: { type: Number, min: 1, max: 5 },
    status: { type: String, enum: ['Pending', 'Submitted by Employee', 'Reviewed by Manager', 'Approved'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);