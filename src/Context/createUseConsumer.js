import React from 'react';

const createUseConsumer = Consumer => mapContextToProps => (wrappedComponenet) => {
  const defaultMapContextToProps = context => ({ context });
  function UseConsumer(props) {
    return (
      <Consumer>
        {(context) => {
          const contextProps = (mapContextToProps || defaultMapContextToProps)(context);
          return <wrappedComponenet {...contextProps} {...props} />;
        }}
      </Consumer>
    );
  }
  const displayName = wrappedComponenet.displayName || wrappedComponenet.name || 'component';
  UseConsumer.displayName = `UserConsumer(${displayName})`;
  return UseConsumer;
};

export default createUseConsumer;
