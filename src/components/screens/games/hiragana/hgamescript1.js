//const startButton = document.querySelector('.startbutton');
//const endButton = document.querySelector('.endbutton');

export function gameStart() {
    const startButton = document.querySelector('.startbutton');
    const endButton = document.querySelector('.endbutton');
    console.log("game started")
    startButton.style.display = 'none';
    endButton.style.display = 'block';
}

export function gameEnd() {
    const startButton = document.querySelector('.startbutton');
    const endButton = document.querySelector('.endbutton');
    startButton.style.display = 'block';
    endButton.style.display = 'none';
}