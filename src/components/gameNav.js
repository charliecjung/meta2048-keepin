import React from 'react';
import PropTypes from 'prop-types';
import { useGameState } from '../Context/gameState';
import constants from '../constants';
import ScoreBoard from './scoreBoard'
const GameNav = ({ setTopic }) => {
  const onClick = (event, topic) => {
    alert("clicked: " + topic)
    setTopic(topic);
    return (
      <ScoreBoard />
    );  
  };
  return (
    <React.Fragment>
      <div className="game-nav">
        <button type="button" className="score-board btn" onClick={event => onClick(event, 'DARS')}>
          SCORE BOARD
          
          
       
        </button>
        <button type="button" className="share-game btn">
          SHARE GAME
        </button>
      </div>
    </React.Fragment>
  );
};







GameNav.propTypes = {
  setTopic: PropTypes.func.isRequired,
};

export default useGameState(({ actions }) => ({
  setTopic: actions.setTopic,
}))(GameNav);
