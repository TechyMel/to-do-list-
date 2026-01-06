const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "temumelvina@gmail.com",
        pass: "bvnc jhkd cdjl jmur"
    }
});

// ===== PASSWORD RESET ENDPOINT =====
app.post("/send-reset", async (req, res) => {
    const { email } = req.body;

    try {
        const info = await transporter.sendMail({
            from: '"CSC118 Project" <temumelvina@gmail.com>',
            to: email,
            subject: "Password Reset Request",
            html: `
                <h2>Password Reset</h2>
                <p>If you requested a password reset, click the link below:</p>
                <a href="http://localhost/CSC118Project/public/Password_reset.html">
                    Reset Your Password
                </a>
            `
        });

        console.log("Reset email sent:", info.messageId);

        res.json({ success: true, message: "Reset link sent to your email." });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: "Could not send reset email." });
    }
});

// ===== START SERVER =====
app.listen(3001, () => {
    console.log("Email server running on http://localhost:3001");
});

