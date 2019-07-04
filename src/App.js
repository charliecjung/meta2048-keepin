import React from 'react';

import './App.css';
import { GameDataProvider } from './context/gameData';
import { GameStateProvider } from './context/gameState';
import Header from './components/header/index';
import Body from './components/body';

// eslint-disable-next-line max-len
const AppProvider = ({ contexts, children }) => contexts.reduce((prev, context) => React.createElement(context, {}, prev), children);

function App() {
  return (
    <AppProvider contexts={[GameDataProvider, GameStateProvider]}>
      <div className="container">
        <Header />
        <Body />
      </div>
    </AppProvider>
  );
}

export default App;
