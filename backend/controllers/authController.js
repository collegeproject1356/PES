const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

exports.googleLogin = async (req, res) => {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
    const { name, email, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
        user = await User.create({ name, email, profilePic: picture, googleId: sub });
    }
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token: generateToken(user._id) });
};

exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins valid

    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please click: \n\n ${resetUrl}`;

    try {
        await sendEmail({ email: user.email, subject: 'Password Reset Request', message });
        res.status(200).json({ message: "Email sent successfully" });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(500).json({ message: "Email could not be sent" });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email.' });
        }

        // Create new user (Role is strictly 'Employee' here for security)
        // Password hashing humare User.js model me pehle se handle ho raha hai
        const user = await User.create({
            name,
            email,
            password,
            role: 'Employee' 
        });

        // Response with Token
        res.status(201).json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            role: user.role, 
            token: generateToken(user._id) 
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};


// --- Reset Password Logic ---
exports.resetPassword = async (req, res) => {
    try {
        // URL wale token ko hash karke database wale token se match karenge
        const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() } // Check if token is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired password reset token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined; // Token ka kaam ho gaya toh delete kar do
        user.resetPasswordExpire = undefined;

        await user.save(); // User.js model ka pre('save') hook apne aap isko encrypt kar dega

        res.status(200).json({ message: 'Password reset successful! You can now login.' });
    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};