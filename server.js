import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";
import Database from "./src/config/db.js";
import routes from "./src/routes/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Edusphere API is Running");
});

app.use("/api/v1", routes);

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await Database();
    app.listen(PORT, () => {
      console.log(`🌍 ⇄ Server is Running on Port 🔌 ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed:", error);
    process.exit(1);
  }
};

startServer();
