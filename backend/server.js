const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const path = require("path");
connectDB();

const allowedOrigins = [
  "http://localhost:3000", // Add your localhost for development
  "http://3.147.193.216", // Update with your frontend domain
];

/* app.use(cors({ credentials: true, origin: allowedOrigins })); */
app.use(cors());
app.use(express.json({ extended: false }));
app.use(cookieParser());

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/document", require("./routes/api/document"));
app.use("/api/conversation", require("./routes/api/conversation"));
app.use("/api/invoice", require("./routes/api/invoice"));

/* const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/build");

app.use(express.static(buildPath));
app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
}); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
