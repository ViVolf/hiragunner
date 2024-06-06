import './GameContainer.css';
import { connect } from 'react-redux';
import Game1 from './kana/Game1.jsx';
import Game2 from './kana/Game2.jsx';
import Game3 from './kana/Game3.jsx';

function GameContainer(props) {

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }
    
    let key = generateKey(Math.random());

    switch (props.game) {
        case 'Home': return (
            <div className='game-container home'>
                <p>
                    Hey, this is the main page of my ReactJS pet project. I'm making it for myself to train Japanese kana.
                    <br />
                    <br />
                    To start - choose one of the games from "Hiragana" or "Katakana" sections from above.
                </p>
            </div>
        );
        case 'HGame 1': return (
            <div className='game-container'><Game1 type='hiragana' key={key} /></div>
        );
        case 'HGame 2': return (
            <div className='game-container'><Game2 type='hiragana' key={key} /></div>
        );
        case 'HGame 3': return (
            <div className='game-container'><Game3 type='hiragana' key={key} /></div>
        );
        case 'KGame 1': return (
            <div className='game-container'><Game1 type='katakana' key={key} /></div>
        );
        case 'KGame 2': return (
            <div className='game-container'><Game2 type='katakana' key={key} /></div>
        );
        case 'KGame 3': return (
            <div className='game-container'><Game3 type='katakana' key={key} /></div>
        );
        case 'Contact': return (
            <div className='game-container contact'>Hey, im contact page</div>
        );
        default: return (
            <div className='game-container'>Something went wrong...</div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        game: state.currentGame.game
    }
}

export default connect(mapStateToProps)(GameContainer);
