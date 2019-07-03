import React from 'react';
import Game from './gameContainer';

class Body extends React.Component {
  state = {
    topic: 'game',
  };

  showComponent() {
    const { topic } = this.state;

    switch (topic) {
      case 'game':
        return <Game startType="new" />;
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

export default Body;
