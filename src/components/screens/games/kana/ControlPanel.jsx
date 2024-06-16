import "./ControlPanel.css";

function ControlPanel({ gameEnd, roundCounter, rightAnswer, wrongAnswer }) {


    return (
        <div className="control-panel">
            <button className="end-button" onClick={gameEnd}><img src="backarrow.png" className="back-icon"></img></button>
            <div className="round-count"><span>{roundCounter + 1}</span></div>
            <div className="right-answer"><span>{rightAnswer} / {wrongAnswer}</span></div>
        </div>
    )
}

export default ControlPanel;