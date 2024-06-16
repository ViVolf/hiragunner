import { useEffect, useState } from "react";
import { hklist } from "./hklist.js";
import "./Game.css";
import ControlPanel from "./ControlPanel.jsx";


function Game1(props) {
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
    const [answer1, setA1] = useState({});
    const [answer2, setA2] = useState({});
    const [answer3, setA3] = useState({});
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
        const genSet = new Set();
        if (!kanaBuffer.length) return;

        while (genSet.size < 3) {

            let el = Math.floor(Math.random() * 71);
            if (kanaBuffer[el]?.id != queImg.id) {
                genSet.add(el)
            }
        }

        const genArr = [...genSet];

        setA1(kanaBuffer[genArr[0]]);
        setA2(kanaBuffer[genArr[1]]);
        setA3(kanaBuffer[genArr[2]]);

        switch (Math.floor(Math.random() * 3)) {
            case 0:
                setA1(queImg);
                break;
            case 1:
                setA2(queImg);
                break;
            case 2:
                setA3(queImg);
                break;
        }
    }

    function checkAnswer(ans) {
        setRC((roundCounter) => roundCounter + 1);
        if (ans.id == queImg.id) {
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
                <ControlPanel gameEnd={gameEnd} roundCounter={roundCounter} rightAnswer={rightAnswer} wrongAnswer={wrongAnswer} />
                <div className="question-row">
                    <div className="question">
                        {props.type === 'hiragana' ? queImg.hsrc : props.type === 'katakana' ? queImg.ksrc : 'hira_icon.png'}
                    </div>
                </div>
                <div className="answer-row">
                    <button className="answer" onClick={() => checkAnswer(answer1)}>{answer1?.eng}</button>
                    <button className="answer" onClick={() => checkAnswer(answer2)}>{answer2?.eng}</button>
                    <button className="answer" onClick={() => checkAnswer(answer3)}>{answer3?.eng}</button>
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

export default Game1;