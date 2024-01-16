import { useEffect, useState } from "react";
import { hklist } from "./hklist.js";
import "./Game.css";

function Game3(props) {
    //Selectors + result
    const menuScreen = document.querySelector(".menuscreen");
    const gameScreen = document.querySelector(".gamescreen");
    const resultScreen = document.querySelector(".resultscreen");
    const result = document.querySelector(".result");
    const input = document.querySelector(".inputanswer");
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
        if (roundCounter > 45) resultEnd(rightAnswer, (rightAnswer / 46).toFixed(2) * 100);
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
            <div className="menuscreen">
                <button className="startbutton" onClick={gameStart}>Start</button>
            </div>
            <div className="gamescreen">
                <button className="endbutton" onClick={gameEnd}><img src="backarrow.png" className="backicon"></img></button>
                <div className="roundcount">{roundCounter + 1}</div>
                <div className="rightanswer">{rightAnswer} / {wrongAnswer}</div>
                <img className="qimg" src={props.type === 'hiragana' ? queImg.hsrc : props.type === 'katakana' ? queImg.ksrc : 'hira_icon.png'} alt="Wasap?"></img>
                <div className="answerform">
                    <label for="inpanswer">Write in English:</label><br></br>
                    <input className="inputanswer" id="inpanswer" autoComplete="off" onKeyDown={(e) => {if(e.key === 'Enter') checkAnswer(input.value)}}></input>
                    <input className="submitanswer" type="button" value="GO" onClick={() => checkAnswer(input.value)}></input>
                </div>
            </div>
            <div className="resultscreen">
                <div className="result"></div>
                <div className="exitbuttons">
                    <button className="startagain" onClick={gameEnd}>Back to menu</button>
                    <button className="startagain" onClick={gameStart}>Start again</button>
                </div>
            </div>
        </div>
    )
}

export default Game3;