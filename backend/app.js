const express = require("express");
const { authMiddleware } = require("./middleware/auth");

const app = express();
const PORT = 4000;

app.use(express.json());

// ✅ protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
