import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/screens/ui/NavBar';
//import GameContainer from './components/screens/games/GameContainer';
import MainField from './components/screens/games/MainField';//
import { Provider } from 'react-redux';
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(window.innerWidth)
if (window.innerWidth > 1800) {
  root.render(
    <Provider store={store}>
      <React.StrictMode>
        <NavBar />
        <MainField />
      </React.StrictMode>
    </Provider>
  );
}
else {
  root.render(

  );
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
