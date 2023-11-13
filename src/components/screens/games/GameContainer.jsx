import './GameContainer.css';
import { connect } from 'react-redux';
import HGame1 from './hiragana/HGame1.jsx';
import HGame2 from './hiragana/HGame2.jsx';

function GameContainer(props) {
    switch (props.game) {
        case 'Home': return (
            <div className='gamecontainer'>Wassap!</div>
        );
        case 'HGame 1': return (
            <div className='gamecontainer'><HGame1 /></div>
        );
        case 'HGame 2': return (
            <div className='gamecontainer'><HGame2 /></div>
        );
        case 'HGame 3': return (
            <div className='gamecontainer'>Hey, im third H</div>
        );
        case 'KGame 1': return (
            <div className='gamecontainer'>Hey, im first K</div>
        );
        case 'KGame 2': return (
            <div className='gamecontainer'>Hey, im second K</div>
        );
        case 'KGame 3': return (
            <div className='gamecontainer'>Hey, im third K</div>
        );
        case 'Contact': return (
            <div className='gamecontainer'>Hey, im contact page</div>
        );
        default : return (
            <div className='gamecontainer'>Something went wrong</div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        game: state.currentGame.game
    }
}

export default connect(mapStateToProps)(GameContainer);
