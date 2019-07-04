import React from 'react';
import PropTypes from 'prop-types';

import { useGameState } from '../context/gameState';
import constants from '../constants';

const GameNav = ({ setTopic }) => (
  <div className="gameNav">
    <button
      type="button"
      className="btn"
      onClick={() => setTopic(constants.gameStateTopic.gameStart)}
    >
      LETS START
    </button>
  </div>
);

GameNav.propTypes = {
  setTopic: PropTypes.func.isRequired,
};

export default useGameState(({ actions }) => ({
  setTopic: actions.setTopic,
}))(GameNav);
