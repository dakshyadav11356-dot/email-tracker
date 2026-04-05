const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ Put your Gmail + App Password here
const EMAIL = "dakshyadav11356@gmail.com";
const PASS = "mocuprpfyyybqipc";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASS
  }
});

app.get("/", async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const message = `New Visitor IP: ${ip}`;

  try {
    await transporter.sendMail({
      from: EMAIL,
      to: EMAIL,
      subject: "Visitor Alert",
      text: message
    });

    console.log("Email sent");
  } catch (err) {
    console.log("Error:", err.message);
  }

  res.send("Welcome!");
});

app.listen(PORT, () => console.log("Server running"));