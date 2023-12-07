const express = require('express');
const path = require('path');
const app = express();

// Définir le port sur lequel le serveur va écouter
const PORT = 3000;

// Servir les fichiers statiques du dossier actuel
app.use(express.static('.'));

// Route principale pour servir le fichier index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
