let gameseq = [];
let userseq = [];

let btns = ["yellow", "green", "red", "purple"];
let started = false;
let level = 0;
let highestScore = 0;

let h2 = document.querySelector("h2");

function playSound(soundFile) {
    let audio = new Audio(soundFile);
    audio.play().catch(error => console.log("Error playing sound:", error));
}

document.addEventListener("keypress", function() {
    if (!started) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

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

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let isNewHighScore = level > highestScore;

        if (isNewHighScore) {
            highestScore = level;
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br> 
                        ${isNewHighScore ? "🎉 New Highest Score! 🎉" : `Highest Score: <b>${highestScore}</b>`}<br>
                        Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        
        playSound("game-over.mp3"); // Add the path to your game over sound file here

        document.body.classList.add("failed");

        setTimeout(function() {
            document.body.classList.remove("failed");
        }, 150);
        setTimeout(function() {
             document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userseq.push(userColor);

    playSound("sound.mp3"); 
    checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

$(".btn").on("click", function() {
    const button = $(this);
    button.addClass("clicked");

    setTimeout(() => button.removeClass("clicked"), 200);
});
