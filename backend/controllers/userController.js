const User = require('../models/User');

// Create User
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role, managerId } = req.body;
        const user = await User.create({ name, email, password, role, managerId });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('managerId', 'name');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};