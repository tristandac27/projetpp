const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');

// Configuration de Multer pour gérer les téléchargements de fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Dossier de destination des fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // Nom du fichier original
  }
})
const upload = multer({ storage: storage });

// Route pour créer une nouvelle publication avec téléchargement de fichier
router.post('/', upload.single('image'), postController.createPost);
router.get('/', postController.getAllPosts);
module.exports = router;
