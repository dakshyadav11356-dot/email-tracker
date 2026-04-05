const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables (set in Render)
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PASS
  }
});

let lastSent = 0;

app.get("/", async (req, res) => {
  const visitorIP =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const userAgent = req.headers["user-agent"];

  const now = Date.now();

  if (now - lastSent > 60000) {
    lastSent = now;

    try {
      await transporter.sendMail({
        from: EMAIL,
        to: EMAIL,
        subject: "New Visitor",
        text: `IP: ${visitorIP}
Device: ${userAgent}
Time: ${new Date().toLocaleString()}`
      });

      console.log("Mail sent");
    } catch (err) {
      console.error("Mail error:", err);
    }
  }

  res.send("Welcome!");
});

app.listen(PORT, () => {
  console.log("Server running");
});