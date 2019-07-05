import React from 'react';
import PropTypes from 'prop-types';

import { useGameState } from '../Context/gameState';
import GameContainer from './gameContainer';
import GameNav from './gameNav';
import constants from '../constants';

class Body extends React.Component {
  componentDidUpdate() {
    const { topic, setTopic } = this.props;
    alert("updated topic: " + topic)
    if (topic === constants.gameStateTopic.gameRestart) {
      setTopic(constants.gameStateTopic.gameStart);
    }
  }

  showComponent() {
    const { topic } = this.props;
    alert("showComponent() topic: " + topic)
    switch (topic) {
      case constants.gameStateTopic.gameReady:
        alert("Alpha")
        break;
      case constants.gameStateTopic.gameRestart:
        alert("Bravo")
        break;
      case constants.gameStateTopic.gameStart:
        alert("Charlie")
        break;
      case constants.gameStateTopic.gameLoad:
        alert("David")
        break;
      case 'auth':
        alert("Ethan")
        break;
      case 'DARS':
        alert("DARS")
        break;
      default:
        alert("father")
        console.log('Your topic is UNDEFINED or a test value. Please set it to the appropriate value above.')
        break;
    }
    alert("returning")
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
