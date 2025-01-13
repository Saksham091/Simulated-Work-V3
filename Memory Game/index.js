const loginButton = document.getElementById('login')

loginButton.onclick = () => {
    location.href = './game.html'
    localStorage.clear()
}