import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./data/db.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import nomineeRoutes from "./routes/nomineeRoutes.js";
import bankDetailRoutes from "./routes/bankDetailRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/nominee", nomineeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bank", bankDetailRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running at ${PORT}`));
