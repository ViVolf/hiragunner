import { useEffect, useState } from "react";
import "./Game.css";
import { hklist } from "./hklist.js";

function Game2(props) {
    //Selectors + result
    const menuScreen = document.querySelector(".menu-screen");
    const gameScreen = document.querySelector(".game-screen");
    const resultScreen = document.querySelector(".result-screen");
    const result = document.querySelector(".result");
    //Kana rows
    const kanaList = [...hklist];
    const [kanaBuffer, setKB] = useState([]);
    //Questions + answers
    const [queImg, setQI] = useState({});
    const [answer, setA] = useState({});
    //counters
    const [roundCounter, setRC] = useState(0);
    const [rightAnswer, setRA] = useState(0);
    const [wrongAnswer, setWA] = useState(0);

    //Starter Shuffle
    useEffect(() => {
        cardShuffle();
    }, []);

    //New round iteration
    useEffect(() => {
        newRound();
    }, [queImg]);

    //First Kana setter
    useEffect(() => {
        setQI(kanaBuffer[0] || 0);
    }, [kanaBuffer]);

    //Next Kana setters
    useEffect(() => {
        if (roundCounter > 70) resultEnd(rightAnswer, (rightAnswer / 71).toFixed(2) * 100);
        setQI(kanaBuffer[roundCounter] || 0);
    }, [roundCounter]);

    function gameStart() {
        cardShuffle();
        menuScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
        resultScreen.style.display = 'none';
    }

    function gameEnd() {
        setRC(0);
        setRA(0);
        setWA(0);
        menuScreen.style.display = 'flex';
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'none';
    }

    function resultEnd(right, percent) {
        setRC(0);
        setRA(0);
        setWA(0);
        result.innerHTML = `You done ${right} kana's right, your percentage of correct answers: ${percent}%`
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'flex';
    }

    function newRound() {
        if (!kanaBuffer.length) return;

        let reference = kanaBuffer[Math.floor(Math.random() * 71)];
        let el = Math.floor(Math.random() * 2);

        if (el === 1) {
            setA(queImg);
            return;
        }

        setA(reference);
    }

    function checkAnswer(ans) {
        setRC((roundCounter) => roundCounter + 1);
        if (ans == (queImg.id == answer.id)) {
            setRA((rightAnswer) => rightAnswer + 1);
            gameScreen.style.backgroundColor = '#82ff62';
            setTimeout(() => gameScreen.style.backgroundColor = 'transparent', 200)
            return;
        }
        setWA((wrongAnswer) => wrongAnswer + 1);
        gameScreen.style.backgroundColor = '#c73153';
        setTimeout(() => gameScreen.style.backgroundColor = 'transparent', 200)
    }

    function cardShuffle() {
        const buff = kanaList.slice(0);
        for (let i = buff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [buff[i], buff[j]] = [buff[j], buff[i]];
        }
        setKB(buff);
    }

    return (
        <div id="board">
            <div className="menu-screen">
                <button className="start-button" onClick={gameStart}>Start</button>
            </div>
            <div className="game-screen">
                <button className="end-button" onClick={gameEnd}><img src="backarrow.png" className="back-icon"></img></button>
                <div className="round-count"><span>{roundCounter + 1}</span></div>
                <div className="right-answer"><span>{rightAnswer} / {wrongAnswer}</span></div>
                <div className="question-row">
                    <div id="question-tf">
                        {props.type === 'hiragana' ? queImg.hsrc : props.type === 'katakana' ? queImg.ksrc : 'hira_icon.png'}
                    </div>
                    <div className="equality">is</div>
                    <div className="reference">{answer?.eng}</div>
                </div>
                <div className="answer-row-tf">
                    <button className="answer1 answer" onClick={() => checkAnswer(true)}>True</button>
                    <button className="answer2 answer" onClick={() => checkAnswer(false)}>False</button>
                </div>
            </div>
            <div className="result-screen">
                <div className="result"></div>
                <div className="exit-buttons">
                    <button className="start-again" onClick={gameEnd}>Back to menu</button>
                    <button className="start-again" onClick={gameStart}>Start again</button>
                </div>
            </div>
        </div>
    )
}

export default Game2;