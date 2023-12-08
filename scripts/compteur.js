

function createBalloon() {
  const baseballon = document.getElementById('baseballon');

  const balloon = document.createElement('img');
  const randomBalloonNumber = Math.floor(Math.random() * 10) + 1;
  balloon.src = `assets/chatgpt/chatgpt-${randomBalloonNumber}.png`;
  balloon.className = 'balloon';
  baseballon.appendChild(balloon);

  // Redimensionner l'image (ajustez la taille selon vos besoins)
  balloon.style.width = '100%';
  balloon.style.height = '100%';

  // Position au centre de la page verticalement
  balloon.style.position = 'relative';
  balloon.style.bottom = '0';
  balloon.style.transform = 'translateY(100%)';

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

let compteurDeClick = 0;

document.addEventListener('DOMContentLoaded', function() {
  const monBouton = document.getElementById('btnCompteur');
  const txtCompt = document.getElementById('txtCompt');
  const txtComptSpec = document.getElementById('txtComptSpec');

  monBouton.addEventListener('click', function() {
    compteurDeClick += 1;
    console.log('Compteur:', compteurDeClick);

    txtCompt.textContent = `${compteurDeClick}`;

    // Mettre à jour la classe du bouton et le texte en fonction du compteur de clics
    if (compteurDeClick === 35) {
      playMusic();
      monBouton.addEventListener('click', createBalloon);
    } else if (compteurDeClick >= 30) {
      txtComptSpec.textContent = `Encore 5 clicks avant de le regretter...`;
    } else if (compteurDeClick >= 20) {
      txtComptSpec.textContent = `ATTENTION ! Ne va pas plus loin... Tu pourrais le regretter`;
      monBouton.classList.remove('btn-dark');
      monBouton.classList.remove('btn-warning');
      monBouton.classList.add('btn-danger');
    } else if (compteurDeClick >= 10) {
      txtComptSpec.textContent = `Attention à ne pas trop cliquer...`;
      monBouton.classList.remove('btn-dark');
      monBouton.classList.add('btn-warning');
    } else {
      txtComptSpec.textContent = '';
      monBouton.classList.remove('btn-warning');
      monBouton.classList.add('btn-dark');
    }
  });
  function playMusic() {
    if (music.paused) {
      music.play();
    } else {
      music.pause();
      music.currentTime = 0;
    }
  }
});
