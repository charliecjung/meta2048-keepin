import React from 'react';

const createUseConsumer = Consumer => mapContextToProps => (WrappedComponenet) => {
  const defaultMapContextToProps = context => ({ context });
  function UseConsumer(props) {
    return (
      <Consumer>
        {(context) => {
          const contextProps = (mapContextToProps || defaultMapContextToProps)(context);
          return <WrappedComponenet {...contextProps} {...props} />;
        }}
      </Consumer>
    );
  }
  const displayName = WrappedComponenet.displayName || WrappedComponenet.name || 'component';
  UseConsumer.displayName = `UserConsumer(${displayName})`;
  return UseConsumer;
};

export default createUseConsumer;
