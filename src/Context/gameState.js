import React from 'react';
import { Map } from 'immutable';

import createUserConsumer from './createUseConsumer';
import constants from '../constants';

const Context = React.createContext();
const { Provider, Consumer: GameStateConsumer } = Context;

class GameStateProvider extends React.Component {
  state = {
    gameState: Map({
      auth: false,
      topic: constants.gameStateTopic.gameReady,
    }),
  };

  actions = {
    setAuth: auth => this.setAuth(auth),
    setTopic: topic => this.setTopic(topic),
  };

  setAuth(auth) {
    if (typeof auth !== 'boolean') return;
    const { gameState } = this.state;
    this.setState({ gameState: gameState.set('auth', auth) });
  }

  setTopic(topic) {
    if (!Object.values(constants.gameStateTopic).includes(topic)) return;
    const { gameState } = this.state;
    this.setState({ gameState: gameState.set('topic', topic) });
  }

  render() {
    const { state, actions, props } = this;
    const value = {
      state: state.gameState.toJS(),
      actions,
    };
    return <Provider value={value}>{props.children}</Provider>;
  }
}

const useGameState = createUserConsumer(GameStateConsumer);

export { GameStateProvider, GameStateConsumer, useGameState };
