const express = require('express');
const router = express.Router();
const { saveEmail } = require('../controllers/emailController');

// Middleware de validation d'email
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  // Vérification que l'email est présent
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: "L'adresse email est requise" 
    });
  }

  // Validation basique du format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: "Format d'email invalide" 
    });
  }

  next();
};

// Route pour vérifier si le service est en ligne
router.get('/health', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Service email opérationnel' 
  });
});

// Route POST pour enregistrer une adresse email
router.post('/', validateEmail, async (req, res) => {
  try {
    await saveEmail(req, res);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur lors de l\'enregistrement de l\'email' 
    });
  }
});

// Route pour obtenir le statut d'un email (optionnel)
router.get('/status/:email', async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: "Format d'email invalide" 
      });
    }
    
    // Vérifier si l'email existe dans la base de données
    const Email = require('../models/Email');
    const emailExists = await Email.findOne({ email });
    
    if (emailExists) {
      res.status(200).json({ 
        success: true, 
        message: 'Email déjà enregistré',
        registered: true
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: 'Email non trouvé',
        registered: false
      });
    }
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur lors de la vérification de l\'email' 
    });
  }
});

module.exports = router;
