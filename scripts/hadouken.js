let queue = [];
const lenghtTab = 10;
const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "B", "A"];

document.addEventListener("keydown", function(e){
    check(e);
});

function check(e) {
    majTab(e);
    if (e.key === "a" || e.key === "A"){
        if (testCombinaison()){
            windowChanges();
        }
    }
}

function testCombinaison(){
    for (let i=0; i < lenghtTab; i++){
        if (queue[i].toUpperCase() !== code[i].toUpperCase()){
            return false;
        }
    }
    return true;
}

function windowChanges(){
    document.body.style.fontFamily = "pixelify";
    document.getElementById("img1").src = "assets/infographie_pixel.jpg";
    document.getElementById("img2").src = "assets/bus_pixel.png";
    document.getElementById("img3").src = "assets/rechauffement_pixel.jpg";
    document.getElementById("img4").src = "assets/revenue_pixel.png";
    document.getElementById("img5").src = "assets/temp_pixel.png";
    document.getElementById("img6").src = "assets/cop_27_pixel.png";
    document.body.style.backgroundColor = "grey";
    document.getElementById("nav").style.display = 'none';
    let bouleBleu = document.createElement('img');
    bouleBleu.src = "assets/street-fighter.gif"
    bouleBleu.style.position = "fixed"
    bouleBleu.style.width = "800px"
    bouleBleu.style.margin = "auto"
    bouleBleu.style.inset = "0"

    document.body.insertBefore(bouleBleu, document.body.firstChild);
    let nouvelElement = document.createElement('h1');
    nouvelElement.textContent = 'ARCADE';
    nouvelElement.style.fontSize = '50px';
    nouvelElement.style.color = 'red';
    nouvelElement.style.textAlign = 'center';
    document.body.insertBefore(nouvelElement, document.body.firstChild);
    let audio = new Audio('music/song_arcade.mp3');
    audio.play();
}

function majTab(e) {
    if (queue.length >= lenghtTab) {
        queue.shift();
        queue.push(e.key);
    }
    else {
        queue.push(e.key);
    }
}
