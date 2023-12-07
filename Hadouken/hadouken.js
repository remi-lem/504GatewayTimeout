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
    console.log(queue)
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
    //TODO
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
