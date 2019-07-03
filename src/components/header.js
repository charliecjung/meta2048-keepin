import React from 'react';
import PropTypes from 'prop-types';

import constants from '../constants';
import { useGameData } from '../context/gameData';

const Header = ({ score, bestScore }) => (
  <React.Fragment>
    <div className="heading">
      <h1 className="title">{constants.haeder.title}</h1>
      <div className="scores-container">
        <div className="score-container">{score}</div>
        <div className="best-container">{bestScore}</div>
      </div>
    </div>
    <div className="above-game">
      <p className="game-intro">{constants.haeder.intro}</p>
    </div>
  </React.Fragment>
);

Header.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};

export default useGameData(({ state }) => ({
  score: state.score,
  bestScore: state.bestScore,
}))(Header);
