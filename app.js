const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔐 Paste your Resend API key here
const API_KEY = "PASTE_YOUR_RESEND_API_KEY";

// 🔐 Your email
const EMAIL = "dakshyadav11356@gmail.com";

app.get("/", async (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const message = `New Visitor IP: ${ip}`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${re_NjVt8PU1_DFf2WzHQRjZtnQ3ZYgWjmZpx}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev", // default sender
        to: EMAIL,
        subject: "Visitor Alert",
        text: message
      })
    });

    const data = await response.json();
    console.log("Email sent:", data);
  } catch (err) {
    console.log("Error:", err.message);
  }

  res.send("Welcome!");
});

app.listen(PORT, () => console.log("Server running"));