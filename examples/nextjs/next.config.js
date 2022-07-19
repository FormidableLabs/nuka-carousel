const path = require('path');

module.exports = () => {
  return {
    webpack(config, { defaultLoaders }) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, '../../src')],
        use: [defaultLoaders.babel]
      });

      return config;
    }
  };
};
