const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const registerRoutes = require('./routes/registerRoutes');
const postRoutes = require('./routes/postRoutes'); 
const multer = require('multer');

const cors = require('cors');
app.use(cors());
app.use(express.json());

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

// Middleware pour gérer les téléchargements de fichiers
app.use('/api/upload', upload.single('file'));

app.use('/api/auth', authRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/posts', postRoutes); // Assurez-vous que postRoutes pointe vers le bon fichier de routes

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
