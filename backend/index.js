const express = require("express");

const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swaggerOptions");
const cors = require("cors");

// Initialize express app
const app = express();

//cors
app.use(cors());

// Load environment variables from .env file
dotenv.config();

//DB
connectDB();

//MiddleWare
app.use(express.json());

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use("/api/users", require("./src/routes/userRoutes"));
app.use("/api/auth", require("./src/routes/authRoutes"));

//Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
