import { useEffect, useState } from "react";
import { hklist } from "./hklist.js";
import "./Game.css";
import ControlPanel from "./ControlPanel.jsx";

function Game3(props) {
    //Selectors + result
    const menuScreen = document.querySelector(".menu-screen");
    const gameScreen = document.querySelector(".game-screen");
    const resultScreen = document.querySelector(".result-screen");
    const result = document.querySelector(".result");
    const input = document.querySelector(".input-answer");
    //Kana rows
    const kanaList = [...hklist];
    const [kanaBuffer, setKB] = useState([]);
    //Question
    const [queImg, setQI] = useState({});
    //counters
    const [roundCounter, setRC] = useState(0);
    const [rightAnswer, setRA] = useState(0);
    const [wrongAnswer, setWA] = useState(0);

    //Starter Shuffle
    useEffect(() => {
        cardShuffle();
    }, []);

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
        input.focus();
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

    function checkAnswer(ans) {
        setRC((roundCounter) => roundCounter + 1);
        if (ans.toLowerCase() == queImg.eng) {
            input.value = '';
            input.focus();
            setRA((rightAnswer) => rightAnswer + 1);
            gameScreen.style.backgroundColor = '#82ff62';
            setTimeout(() => gameScreen.style.backgroundColor = 'transparent', 200)
            return;
        }
        input.value = '';
        input.focus();
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
                <ControlPanel gameEnd={gameEnd} roundCounter={roundCounter} rightAnswer={rightAnswer} wrongAnswer={wrongAnswer} />
                <div className="question-row">
                    <div className="question">
                        {props.type === 'hiragana' ? queImg.hsrc : props.type === 'katakana' ? queImg.ksrc : 'hira_icon.png'}
                    </div>
                </div>
                <div className="answer-form">
                    <label id="answer-label" htmlFor="inp-answer">Write in English:</label><br></br>
                    <input className="input-answer" id="inp-answer" autoComplete="off" onKeyDown={(e) => { if (e.key === 'Enter') checkAnswer(input.value) }}></input>
                    <input className="submit-answer" type="button" value="GO" onClick={() => checkAnswer(input.value)}></input>
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

export default Game3;