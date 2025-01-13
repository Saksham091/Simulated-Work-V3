const playAgain = document.getElementById('play-again')
const score = document.getElementById('score')
const win = document.getElementById('win')
const phrase = document.getElementById('phrases')

playAgain.onclick = () => {
    location.href = 'game.html'
    sessionStorage.removeItem('score')
}

var losePhrases = [
    "Better luck next time",
    "So Sad :(",
    "Oooh! Close",
    "Don't feel sad",
]

var winPhrases = [
    "Amazing!!",
    "Well played!",
    "Eureka!!!",
    "Bull's Eye!!",
]
var matchedCard = sessionStorage.getItem('score')
score.innerHTML = 'Your Score - ' + matchedCard + '%'