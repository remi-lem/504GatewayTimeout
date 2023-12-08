// Fonction pour jouer la musique
function playMusic() {
  let music = document.getElementById('music');
  if (music.paused) {
    music.play();
  } else {
    music.pause();
    music.currentTime = 0;
  }
}

// Ajoutez un écouteur d'événements pour détecter le clic sur le bouton
document.getElementById('btnCompteur').addEventListener('click', playMusic);
