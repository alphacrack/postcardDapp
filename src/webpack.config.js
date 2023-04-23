const path = require('path');

module.exports = {
  // Other configuration settings...

  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify')
    }
  }
};
