import React from 'react';
import PropTypes from 'prop-types';

import constants from '../../constants';
import { useGameState } from '../../Context/gameState';
import ScoreContainer from './scoreContainer';

const Header = ({ setTopic }) => {
  const onClick = (event, topic) => {
    // event.preventDefault();
    setTopic(topic);
  };

  return (
    <React.Fragment>
      <div className="heading">
        <button
          type="button"
          className="restart btn"
          onClick={event => onClick(event, constants.gameStateTopic.gameRestart)}>
          Restart 
          </button>
        
        <ScoreContainer />
      </div>
    </React.Fragment>
  );
};

Header.propTypes = {
  setTopic: PropTypes.func.isRequired,
};

export default useGameState(({ actions }) => ({
  setTopic: actions.setTopic,
}))(Header);
