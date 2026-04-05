const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const device = req.headers["user-agent"];
  const time = new Date().toISOString();

  const data = `IP: ${ip} | Device: ${device} | Time: ${time}\n`;

  // Save to file (stable logging)
  fs.appendFile("visitors.txt", data, (err) => {
    if (err) console.error("File error:", err);
  });

  // Console log (backup)
  console.log(data);

  res.send("Welcome!");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});