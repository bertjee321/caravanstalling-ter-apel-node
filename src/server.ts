import bcrypt from "bcryptjs";
import cors from "cors";
import express from "express";
import { authenticateToken } from "./middleware/auth";
import authRoutes from "./routes/auth";
import customersRoutes from "./routes/customers";
import invoicesRoutes from "./routes/invoices";
import vehiclesRoutes from "./routes/vehicles";

const app = express();
app.use(express.json());

// Add CORS middleware
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent across origins
};

app.use(cors(corsOptions));
app.use("/api/auth", authRoutes);
app.use("/api/customers", authenticateToken, customersRoutes);
app.use("/api/vehicles", authenticateToken, vehiclesRoutes);
app.use("/api/invoices", authenticateToken, invoicesRoutes);

app.get("/api/protected", authenticateToken, (req, res) => {
  res.send("This is a protected route");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
