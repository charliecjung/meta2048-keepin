import React from 'react';
import PropTypes from 'prop-types';

import { useGameState } from '../Context/gameState';
import GameContainer from './gameContainer';
import GameNav from './gameNav';
import constants from '../constants';
import ScoreBoard from './scoreBoard';
import ShareInformation from './shareInfo';
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
        break;
      case constants.gameStateTopic.gameRestart:
        break;
      case constants.gameStateTopic.gameStart:
        break;
      case constants.gameStateTopic.gameLoad:
        break;
      case constants.gameStateTopic.shareInformation:
        return (
        <ShareInformation />
        );
        break;
      case 'auth':
        break;
      case 'scoreboard':
        return (
        <ScoreBoard />
        );

        break;
      default:
        console.log('Your topic is UNDEFINED or a test value. Please set it to the appropriate value above.')
        break;
    }
    return (
      <React.Fragment>
        <GameContainer startType={topic} />
        <GameNav />
      </React.Fragment>
    );
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
