import "./MainField.css";
import GameContainer from './GameContainer';
import FallingLeaves from "../visuals/FallingLeaves";

function MainField() {
    return (
        <div className="mainfield">
            <FallingLeaves />
            <GameContainer />
            <FallingLeaves />
        </div>
    )
}

export default MainField;