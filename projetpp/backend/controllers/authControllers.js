const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erreur de requête SQL :', err);
      return res.status(500).json({ message: 'Erreur du serveur' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe invalide' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Erreur de comparaison de mots de passe :', err);
        return res.status(500).json({ message: 'Erreur du serveur' });
      }
      if (!isMatch) {
        return res.status(401).json({ message: 'Email ou mot de passe invalide' });
      }

      // Inclure l'ID et le nom de l'utilisateur dans la réponse JSON
      res.json({ 
        token: jwt.sign({ id: user.id }, 'remitropsexy7', { expiresIn: '1h' }),
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email 
        } 
      });
    });
  });
};
