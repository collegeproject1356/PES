const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1. Transporter create karein (Email service configure karna)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // 2. Email ke options set karein
    const mailOptions = {
        from: `PerformX System <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // 3. Email send karein
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;