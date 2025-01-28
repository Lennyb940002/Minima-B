const Email = require('../models/Email');

// Contrôleur pour enregistrer une adresse email
const saveEmail = async (req, res) => {
  const { email } = req.body;

  try {
    // Créer une nouvelle adresse email et l'enregistrer dans la base de données
    const newEmail = new Email({ email });
    await newEmail.save();

    res.status(201).json({ message: 'Email saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving email', error });
  }
};

module.exports = {
  saveEmail,
};