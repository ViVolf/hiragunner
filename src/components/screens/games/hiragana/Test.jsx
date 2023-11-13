import { useEffect, useState } from "react";
import "./HGam.css";
import { hklist } from "./hklist.js";

function HGam() {
    const kanaList = [...hklist];
    const [kanaBuff, setKB] = useState([]);

    useEffect(() => {
        cardShuffle();
        console.log('Not buffered LIST:')
        console.log(kanaList)
    }, []);

    useEffect(() => {
        console.log('Buffered LIST:')
        console.log(kanaBuff);
    }, [kanaBuff]);

    function cardShuffle() {
        console.log('Shuffling-------_____-----');//
        let buff = kanaList.slice(0);
        for (let i = buff.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [buff[i], buff[j]] = [buff[j], buff[i]];
        }
        setKB(buff);
    }

    return (
        <div id="board">
            Ass
        </div>
    )
}

export default HGam;