import React from 'react';
import PropTypes from 'prop-types';
import { useGameState } from '../Context/gameState';
import constants from '../constants';
import GameNav from './gameNav'
const ScoreBoard = ({ setTopic }) => {
  
  return (
    <div>
     skdljfkljsdklfjskjdfljsdfklj
    </div>
  );
};
ScoreBoard.propTypes = {
  setTopic: PropTypes.func.isRequired,
};

export default useGameState(({ actions }) => ({
  setTopic: actions.setTopic,
}))(ScoreBoard);
