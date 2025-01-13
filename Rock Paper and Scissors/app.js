const btns=document.querySelectorAll('.buttons');
const score1=document.getElementById('score-1')
const score2=document.getElementById('score-2')
const playerHand=document.getElementById('player-hand')
const compHand=document.getElementById('comp-hand')
const gameOverOverlay=document.getElementById('game-over')
const winner=document.getElementById('winner')
const btnHolder=document.getElementById('button-holder')

let playerScore=0,compScore=0,compTurn;

nextRound()

function nextRound() {
    let temp=compTurn;
    compTurn=Math.floor(Math.random()*3);
    if (temp==compTurn) {
        if(temp%2==0) nextRound()
        else compTurn=Math.floor(Math.random()*3);
    }
}

for(let i=0;i<3;i++) {
    btns[i].onclick=()=>{

        playerHand.style.backgroundImage=`url('./assets/hand${i}.png')`;
        compHand.style.backgroundImage=`url('./assets/hand${compTurn}.png')`;

        if (i==0) {
            if (compTurn == 1)
            compScore++;
            else if (compTurn == 2)
            playerScore++;
        }
        else if (i==1) {
            if (compTurn==0)
            playerScore++;
            else if (compTurn == 2)
            compScore++;
        }
        else {
            if (compTurn==0)
            compScore++;
            else if (compTurn == 1)
            playerScore++;
        }

        score1.innerText=playerScore;
        score2.innerText=compScore;

        if (playerScore==5 || compScore==5) {
            gameOver();
        }

        nextRound();

    }
}

function gameOver() {
    gameOverOverlay.style.display='block'
    btnHolder.style.display='none'

    if (playerScore>compScore) winner.innerText='You'
    else winner.innerText='Computer'
}

document.getElementById('play-again').onclick=()=>{
    window.open('index.html','_self')
}