import React from 'react';
import PropTypes from 'prop-types';

import { useGameState } from '../context/gameState';
import GameContainer from './gameContainer';
import constants from '../constants';

class Body extends React.Component {
  componentDidUpdate() {
    const { topic, setTopic } = this.props;
    if (topic === constants.gameStateTopic.gameRestart) {
      setTopic(constants.gameStateTopic.gameStart);
    }
  }

  showComponent() {
    const { topic } = this.props;
    switch (topic) {
      case constants.gameStateTopic.gameReady:
      case constants.gameStateTopic.gameRestart:
      case constants.gameStateTopic.gameStart:
      case constants.gameStateTopic.gameLoad:
        return <GameContainer startType={topic} />;
      case 'auth':
        return null;
      default:
        return null;
    }
  }

  render() {
    return this.showComponent();
  }
}

Body.propTypes = {
  topic: PropTypes.string.isRequired,
  setTopic: PropTypes.func.isRequired,
};

export default useGameState(({ state, actions }) => ({
  topic: state.topic,
  setTopic: actions.setTopic,
}))(Body);
