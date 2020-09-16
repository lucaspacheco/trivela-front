/* eslint-disable no-param-reassign */
module.exports = {
  extends: '@snowpack/app-scripts-react',
  plugins: ['@snowpack/plugin-optimize'],
  alias: {
    assets: './src/assets',
    components: './src/components',
    styles: './src/styles',
  },
};
