const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");

connectDB();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/document", require("./routes/api/document"));
app.use("/api/conversation", require("./routes/api/conversation"));
app.use("/api/invoice", require("./routes/api/invoice"));

const handleTEmp = async () => {
  const salt = await bcrypt.genSalt(10);

  /* user.password = await bcrypt.hash(password, salt); */
  const temp = await bcrypt.decodeBase64(
    "$2a$10$fH4kczqVF5Qtdu.tHPvalOIiypno5jjnXfG25z86zH2OaxyQM0kxi",
    salt
  );
  console.log("TEMP");
  console.log(temp);
};

handleTEmp();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
