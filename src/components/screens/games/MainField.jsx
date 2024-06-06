import "./MainField.css";
import GameContainer from './GameContainer';
import FallingLeaves from "../visuals/FallingLeaves";

function MainField() {
    return (
        <div className="main-field">
            <FallingLeaves />
            <GameContainer />
            <FallingLeaves />
        </div>
    )
}

export default MainField;