require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Connexion à MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Route test simple
app.get("/", (req, res) => {
  res.send("API en marche !");
});

// Routes Auth
app.use("/api/auth", authRoutes);

// Exemple route protégée
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Accès autorisé", user: req.user });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
