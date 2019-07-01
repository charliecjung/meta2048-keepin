import React from 'react';
import PropTypes from 'prop-types';

import constants from '../constants';

class Body extends React.Component {
  state = {
    topic: 'game',
  };

  showComponent() {
    const { topic } = this.state;

    switch (topic) {
      case 'game':
        break;
      case 'auth':
        break;
      default:
        break;
    }
  }

  render() {
    return this.showComponent();
  }
}

export default Body;
