import React from 'react';

import './App.css';
import { GameDataProvider } from './context/gameData';
import Header from './components/header';

function App() {
  return (
    <GameDataProvider>
      <div className="container">
        <Header />
      </div>
    </GameDataProvider>
  );
}

export default App;
