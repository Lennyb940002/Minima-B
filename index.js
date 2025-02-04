const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./utils/db');

// Charger les variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Configurer CORS pour permettre les requêtes du frontend
app.use(cors({
  origin: ['https://www.minimaapp.com', 'https://minimaapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware pour parser le JSON
app.use(express.json());

// Définir une route simple pour vérifier le serveur
app.get('/', (req, res) => {
  res.send('Hello, Minima Backend!');
});

// Importer et utiliser les routes pour les emails
const emailRoutes = require('./routes/emails');
app.use('/api/emails', emailRoutes);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
