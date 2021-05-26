/* eslint-disable no-param-reassign */
module.exports = {
  extends: '@snowpack/app-scripts-react',
  plugins: ['@snowpack/plugin-optimize'],
  alias: {
    services: './src/services',
    assets: './src/assets',
    components: './src/components',
    pages: './src/pages',
    queries: './src/queries',
    styles: './src/styles',
    utils: './src/utils',
  },
  install: ['@material-ui/icons', 'react-query-devtools'],
  // Mockoon Proxy
  proxy: {
    //'/api': 'http://0.0.0.0:7001/',
    '/api': 'http://localhost:3000/',
    '/cartola': 'https://api.cartolafc.globo.com/times',
  },
};
