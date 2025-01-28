const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connexion à MongoDB
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Minima Backend!');
});

const emailRoutes = require('./routes/emails');
app.use('/api/emails', emailRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});