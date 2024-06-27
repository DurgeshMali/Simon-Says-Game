let gameSequence = [];
let userSequence = [];

let buttons = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("mousedown", function() {
    if(started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

function levelUp() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randomIndex = Math.floor(Math.random() * 3);
    let randomColor = buttons[randomIndex];
    let randomButtom = document.querySelector(`.${randomColor}`);

    gameSequence.push(randomColor);

    gameFlash(randomButtom);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

let allButtons = document.querySelectorAll(".btn");
for(button of allButtons) {
    button.addEventListener("click", buttonPress);
}

function buttonPress() {
    let button = this;
    userFlash(button);

    userColor = button.getAttribute("id");
    userSequence.push(userColor); 

    checkAns(userSequence.length-1);
}

function checkAns(idx) {
    if(userSequence[idx] == gameSequence[idx]) {
        if(userSequence.length == gameSequence.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any Key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset()
    }
}

function reset() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0; 
}