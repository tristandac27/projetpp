const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', // Remplacez par le nom d'hôte de votre base de données
  user: 'root', // Remplacez par votre nom d'utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'projetpp' // Remplacez par le nom de votre base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }
  console.log('Connexion à la base de données réussie');
});

module.exports = db;
