import './NavBar.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeGame } from '../../../redux/slices/currentGameSlice';

function NavBar() {
  //const currentGame = useSelector(state => state.currentGame.game) // Хук на состояние текущего окна контейнера
  const dispatch = useDispatch()

  return (
    <nav>
      <ul className="menu">
        <li className="menu-item home-button"><button onClick={() => dispatch(changeGame('Home'))}><img src='hira_icon.png' className='homeicon'></img></button></li>
        <li className="menu-item dropdown">
          <button>Hiragana</button>
          <ul className="submenu">
            <li className="submenu-item"><button onClick={() => dispatch(changeGame('HGame 1'))}>Guess hiragana</button></li>
            <li className="submenu-item"><button onClick={() => dispatch(changeGame('HGame 2'))}>True / False</button></li>
            <li className="submenu-item"><button onClick={() => dispatch(changeGame('HGame 3'))}>Write ur answer</button></li>
          </ul>
        </li>
        <li className="menu-item dropdown">
          <button>Katakana</button>
          <ul className="submenu">
            <li className="submenu-item"><button onClick={() => dispatch(changeGame('KGame 1'))}>Guess katakana</button></li>
            <li className="submenu-item"><button onClick={() => dispatch(changeGame('KGame 2'))}>True / False</button></li>
            <li className="submenu-item"><button onClick={() => dispatch(changeGame('KGame 3'))}>Write ur answer</button></li>
          </ul>
        </li>
        <li className="menu-item right"><button onClick={() => dispatch(changeGame('Contact'))}>About</button></li>
      </ul>
    </nav>
  );
}

export default NavBar;