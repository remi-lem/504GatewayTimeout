document.getElementById('button').addEventListener('click', createBalloon);

function createBalloon() {
  const baseballon = document.getElementById('baseballon');

  const balloon = document.createElement('img');
  balloon.src = 'images/chatgpt/chatgpt-1.png'; // Remplacez par le chemin de votre grande image de ballon
  balloon.className = 'balloon';
  baseballon.appendChild(balloon);

  // Redimensionner l'image (ajustez la taille selon vos besoins)
  balloon.style.width = '50%';
  balloon.style.height = '50%';

  // Position au centre de la page verticalement
  balloon.style.bottom = '50%';
  balloon.style.transform = 'translateY(50%)';

  // Animation de déplacement vers le haut
  animateBalloon(balloon, baseballon.clientHeight);
}

function animateBalloon(balloon, baseballonHeight) {
  const duration = 4; // Durée totale de l'animation en secondes

  balloon.style.transition = `transform ${duration}s linear, bottom ${duration}s linear`;
  balloon.style.transform = `translateY(-${baseballonHeight}px)`;

  // Supprime le ballon après l'animation
  setTimeout(() => {
    balloon.remove();
  }, duration * 1000);
}
