const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Normal login ke liye
    googleId: { type: String }, 
    role: { type: String, enum: ['Employee', 'Manager', 'Admin'], default: 'Employee' },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    profilePic: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true });

// Password hashing before saving (FIXED)
userSchema.pre('save', async function() {
    // Agar password modify nahi hua hai, ya password empty hai (Google Auth case)
    if (!this.isModified('password') || !this.password) {
        return; 
    }
    
    // Password ko secure hash me convert karein
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);