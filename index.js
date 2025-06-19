const express = require("express");
const app = express();
const connectDB = require("./src/config/db");
require("dotenv").config();

//DB
connectDB();

//MiddleWare
app.use(express.json());

//Routes
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));

//Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
