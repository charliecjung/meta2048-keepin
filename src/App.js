import React from 'react';

import './App.css';
import { GameDataProvider } from './context/gameData';
import Header from './components/header';
import Body from './components/body';

function App() {
  return (
    <GameDataProvider>
      <div className="container">
        <Header />
        <Body />
      </div>
    </GameDataProvider>
  );
}

export default App;
