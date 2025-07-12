const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000; // ← ここ大事！

app.get("/", (req, res) => {
  res.send("Bot is alive!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
