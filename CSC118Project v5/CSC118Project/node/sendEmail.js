const nodemailer = require("nodemailer");

// Replace with your actual email + app password
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "temumelvina@gmail.com",
        pass: "bvnc jhkd cdjl jmur"
    }
});

async function sendEmail() {
    try {
        const info = await transporter.sendMail({
            from: '"CSC118 Project" <YOUR_GMAIL@gmail.com>',
            to: "test@example.com",
            subject: "Hello from Node.js!",
            html: "<h1>This is a test email 🔥</h1>"
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

sendEmail();
