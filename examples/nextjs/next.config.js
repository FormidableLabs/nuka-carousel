const path = require('path');

const aliasPathsToResolve = [
  { name: 'nuka', path: path.resolve(__dirname, '../../src/index') },
]
module.exports = () => {
  return  {
    webpack(config, { defaultLoaders }) {
      config.module.rules.push({
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, '../../src')],
        use: [defaultLoaders.babel],
      })

      return config;
    }
  }
}