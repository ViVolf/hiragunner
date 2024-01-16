import './GameContainer.css';
import { connect } from 'react-redux';
import Game1 from './hiragana/Game1.jsx';
import Game2 from './hiragana/Game2.jsx';
import Game3 from './hiragana/Game3.jsx';

function GameContainer(props) {
    let key = Math.random();//Reload simular components

    switch (props.game) {
        case 'Home': return (
            <div className='gamecontainer home'>
                <p1>Hey, this is the main page of my ReactJS pet project. I'm making it for myself to train Japanese kana.</p1>
                <p2>To start - choose one of the games from "Hiragana" or "Katakana" sections from above.</p2>
            </div>
        );
        case 'HGame 1': return (
            <div className='gamecontainer'><Game1 type='hiragana' key={key}/></div>
        );
        case 'HGame 2': return (
            <div className='gamecontainer'><Game2 type='hiragana' key={key}/></div>
        );
        case 'HGame 3': return (
            <div className='gamecontainer'><Game3 type='hiragana' key={key}/></div>
        );
        case 'KGame 1': return (
            <div className='gamecontainer'><Game1 type='katakana' key={key}/></div>
        );
        case 'KGame 2': return (
            <div className='gamecontainer'><Game2 type='katakana' key={key}/></div>
        );
        case 'KGame 3': return (
            <div className='gamecontainer'><Game3 type='katakana' key={key}/></div>
        );
        case 'Contact': return (
            <div className='gamecontainer contact'>Hey, im contact page</div>
        );
        default : return (
            <div className='gamecontainer'>Something went wrong...</div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        game: state.currentGame.game
    }
}

export default connect(mapStateToProps)(GameContainer);
