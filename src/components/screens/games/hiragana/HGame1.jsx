import { useEffect, useState } from "react";
import "./HGame1.css";
import { hklist } from "./hklist.js";
//import { gameStart, gameEnd } from "./hgamescript1.js" Неудачная попытка импорта, логику оставил здесь

function HGame1() {
    //base constructs
    const [menuScreen, setMS] = useState(0);
    const [gameScreen, setGS] = useState(0);
    const [resultScreen, setRS] = useState(0); //
    const [result, setR] = useState(0);
    //kana + question
    const [kanaList, setKL] = useState(hklist);
    const [kanaBuffer, setKB] = useState(0);
    const [queImg, setQI] = useState(hklist[0]);
    //answers
    const [answer1, setA1] = useState({});
    const [answer2, setA2] = useState({});
    const [answer3, setA3] = useState({});
    //counters
    const [roundCounter, setRC] = useState(0);
    const [rightAnswer, setRA] = useState(0);
    const [wrongAnswer, setWA] = useState(0);


    useEffect(() => {
        setMS(document.querySelector(".menuscreen"));
        setGS(document.querySelector(".gamescreen"));
        setRS(document.querySelector(".resultscreen"));
        setR(document.querySelector(".result"));
        cardShuffle(kanaList);
    }, [])

    useEffect(() => {
        newRound();
    }, [queImg])

    function gameStart() {
        cardShuffle(kanaList);
        setQI(kanaBuffer[roundCounter]);
        menuScreen.style.display = 'none';
        gameScreen.style.display = 'flex';
        resultScreen.style.display = 'none'; //
    }

    function gameEnd() {
        setRC(0);
        setRA(0);
        setWA(0);
        menuScreen.style.display = 'flex';
        gameScreen.style.display = 'none';
        resultScreen.style.display = 'none'; //
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
        let a1 = Math.floor(Math.random() * 46);
        let a2 = Math.floor(Math.random() * 46);
        let a3 = Math.floor(Math.random() * 46);

        setA1(kanaBuffer[a1]);
        setA2(kanaBuffer[a2 = !a1 ? a2 : (a2 + 1) % 45]);
        setA3(kanaBuffer[a3 == a1 ? (a3 + 1) % 45 : a3 == a2 ? (a3 + 1) % 45 : a3]);

        switch (Math.floor(Math.random() * 3) + 1) {
            case 1:
                setA1(queImg);
                return;
            case 2:
                setA2(queImg);
                return;
            case 3:
                setA3(queImg);
                return;
        }
    }

    function checkAnswer(ans) {
        setRC((roundCounter) => roundCounter + 1);
        if (roundCounter > 45) {
            resultEnd(rightAnswer, (rightAnswer / 46).toFixed(2) * 100);
            return;
        }
        setQI(kanaBuffer[roundCounter]);
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

    function cardShuffle(array) {
        let buff = array.slice(0);
        for (let i = buff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [buff[i], buff[j]] = [buff[j], buff[i]];
        }
        setKB(buff);
    }

    return (
        <div id="board">
            <div className="menuscreen">
                <button className="startbutton" onClick={gameStart}>Start</button>
            </div>
            <div className="gamescreen">
                <button className="endbutton" onClick={gameEnd}><img src="backarrow.png" className="backicon"></img></button>
                <div className="roundcount">{roundCounter + 1}</div>
                <div className="rightanswer">{rightAnswer} / {wrongAnswer}</div>
                <img className="qimg" src={queImg.hsrc} alt="Wasap?"></img>
                <div className="answerrow">
                    <button className="answer1 answer" onClick={() => checkAnswer(answer1)}>{answer1?.eng}</button>
                    <button className="answer2 answer" onClick={() => checkAnswer(answer2)}>{answer2?.eng}</button>
                    <button className="answer3 answer" onClick={() => checkAnswer(answer3)}>{answer3?.eng}</button>
                </div>
            </div>
            <div className="resultscreen">
                <div className="result">Your result is </div>
                <div className="exitbuttons">
                    <button className="startagain" onClick={gameEnd}>Back to menu</button>
                    <button className="startagain" onClick={gameStart}>Start again</button>
                </div>
            </div>
        </div>
    )
}

export default HGame1;