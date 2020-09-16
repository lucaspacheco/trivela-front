/* eslint-disable no-param-reassign */
module.exports = {
  extends: '@snowpack/app-scripts-react',
  plugins: ['@snowpack/plugin-optimize'],
  alias: {
    services: './src/services',
    assets: './src/assets',
    components: './src/components',
    pages: './src/pages',
    styles: './src/styles',
    utils: './src/utils',
  },
  install: ['@material-ui/icons'],
  // Mockoon Proxy
  proxy: {
    '/api': 'http://0.0.0.0:7001/',
  },
};
