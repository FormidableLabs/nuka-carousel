const path = require('path');
const debug = process.env.NODE_ENV !== 'production'

module.exports = () => {
  return {
    assetPrefix: !debug ? '/nuka-carousel/' : '',
    webpack(config, { defaultLoaders }) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.resolve(__dirname, '../../src-v5')],
        use: [defaultLoaders.babel]
      });

      return config;
    }
  };
};
