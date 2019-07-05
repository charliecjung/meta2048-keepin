import React from 'react';
import PropTypes from 'prop-types';

import { useGameState } from '../Context/gameState';
import constants from '../constants';

const GameNav = ({ setTopic }) => (
  <div className="game-nav">
    <button type="button" className="score-board btn">
      SCORE BOARD
    </button>
    <button type="button" className="share-game btn">
      SHARE GAME
    </button>
  </div>
);

GameNav.propTypes = {
  setTopic: PropTypes.func.isRequired,
};

export default useGameState(({ actions }) => ({
  setTopic: actions.setTopic,
}))(GameNav);
