import "./FallingLeaves.css";

function FallingLeaves() {
    return (
        <div className="forest">
            <div className="leavesgroup leavesgroup1">
                <img className="leaf leaf1" src="leaves/leaf1.png"></img>
                <img className="leaf leaf2" src="leaves/leaf2.png"></img>
                <img className="leaf leaf3" src="leaves/leaf3.png"></img>
            </div>
            <div className="leavesgroup leavesgroup2">
                <img className="leaf leaf21" src="leaves/leaf1.png"></img>
                <img className="leaf leaf22" src="leaves/leaf2.png"></img>
                <img className="leaf leaf23" src="leaves/leaf3.png"></img>
            </div>
            <div className="leavesgroup leavesgroup3">
                <img className="leaf leaf31" src="leaves/leaf1.png"></img>
                <img className="leaf leaf32" src="leaves/leaf2.png"></img>
                <img className="leaf leaf33" src="leaves/leaf3.png"></img>
            </div>
        </div>
    )
}

export default FallingLeaves;