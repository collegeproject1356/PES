const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    managerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Completed'], 
        default: 'Pending' 
    },
    cycleId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cycle' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);