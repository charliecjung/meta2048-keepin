import React from 'react';
import PropTypes from 'prop-types';

import { useGameData } from '../../context/gameData';

const ScoreContainer = ({ score, bestScore }) => (
  <div className="scores-container">
    <div className="score-container">{score}</div>
    <div className="best-container">{bestScore}</div>
  </div>
);

ScoreContainer.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
};

export default useGameData(({ state }) => ({
  score: state.score,
  bestScore: state.bestScore,
}))(ScoreContainer);
