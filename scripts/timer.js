const elementTm = document.getElementById('tMin');
const elementTs = document.getElementById('tSec');
const elementSoon = document.getElementById('txtSoon');
const myModal = new bootstrap.Modal(document.getElementById('exampleModal')); // Initialize the modal
const myInput = document.getElementById('myInput');


let duree_totalS = 0;

function refreshPage() {
  window.location.reload();
}

function infinitTimer() {
  duree_totalS += 1;

  let min = parseInt((duree_totalS % 3600) / 60, 10);
  min = min < 10 ? '0' + min : min;

  let second = parseInt(duree_totalS % 60, 10);
  second = second < 10 ? '0' + second : second;

  if (duree_totalS % (60*5) == 0) {
    // Toutes les 5 minutes la popup apparait
    // AFFICHER POPUP ICI -
    elementSoon.textContent = `Cela fait actuellement ${min} minute(s) que tu es sur le site`;

    // Open the Bootstrap modal programmatically
    myModal.show();
  }
}
setInterval(infinitTimer, 1000);
