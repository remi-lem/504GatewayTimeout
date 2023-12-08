document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('tetrisSound');

    audio.addEventListener('ended', function() {
        // L'événement 'ended' est déclenché à la fin de la lecture
        // Vous pouvez ajouter du code ici pour redémarrer l'audio
        audio.currentTime = 0; // Remettre le temps de lecture à zéro
        audio.play(); // Redémarrer la lecture
    });
});
