import React from 'react';
import { Map } from 'immutable';

import createUserConsumer from './createUseConsumer';
import constants from '../constants';

const Context = React.createContext();
const { Provider, Consumer: GameDataConsumer } = Context;

class GameDataProvider extends React.Component {
  state = {
    gameData: Map({
      gameSize: constants.gameData.gameSize,
      startTiles: constants.gameData.startTiles,
      grid: { size: null, cell: null },
      score: 0,
      bestScore: 0,
      over: false,
      won: false,
      terminated: false,
      keepPlaying: false,
    }),
  };

  actions = {
    updateGameData: state => this.updateGameData(state),
    stopGame: isTerminate => this.stopGame(isTerminate),
  };

  updateGameData(_state) {
    const { gameData } = this.state;
    this.setState(
      {
        gameData: gameData
          .update('grid', grid => (_state.grid ? _state.grid : grid))
          .update('score', score => (typeof _state.score === 'number' ? _state.score : score))
          .update('bestScore', bestScore => (_state.bestScore ? _state.bestScore : bestScore))
          .update('over', over => (typeof _state.over === 'boolean' ? _state.over : over))
          .update('won', won => (typeof _state.won === 'boolean' ? _state.won : won))
          .update('keepPlaying', keepPlaying => (typeof _state.keepPlaying === 'boolean' ? _state.keepPlaying : keepPlaying)),
      },
      () => this.isTerminated(),
    );
  }

  isTerminated() {
    const { gameData } = this.state;
    const terminated = gameData.get('over') || (gameData.get('won') && !gameData.get('keepPlaying'));

    if (gameData.get('terminated') !== terminated) this.setState({ gameData: gameData.set('terminated', terminated) });
  }

  stopGame(isTerminate) {
    if (typeof isTerminate !== 'boolean') return;
    const { gameData } = this.state;
    this.setState({ gameData: gameData.set('terminated', isTerminate) });
  }

  render() {
    const { state, actions, props } = this;
    const value = {
      state: state.gameData.toJS(),
      actions,
    };
    return <Provider value={value}>{props.children}</Provider>;
  }
}

const useGameData = createUserConsumer(GameDataConsumer);

export { GameDataProvider, GameDataConsumer, useGameData };
