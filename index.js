const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const { swaggerUi, specs } = require("./src/config/swagger");

// Import routes
const userRoutes = require("./src/routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "Motor Rental API Documentation",
  })
);

// Routes
app.use("/api/users", userRoutes);

// Simple route test
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Motor Rental Backend is running!</h1>
    <p>API Documentation: <a href="/api-docs">/api-docs</a></p>
    <p>Users API: <a href="/api/users">/api/users</a></p>
  `);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(` API Documentation: http://localhost:${PORT}/api-docs`);
});
