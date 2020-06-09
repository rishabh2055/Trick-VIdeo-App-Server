// Imports: Dependencies
const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
// Webpack Configuration
const config = {
  
  // Entry
  entry: './server.js',
  // Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  // Loaders
  module: {
    rules : [
      // JavaScript Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  resolve: {
    // Resolve absolute imports using these paths (in this order).
    modules: [
      './server/',
      './node_modules/',
    ],
  },

  target: 'node',

  node: {
    // Don't replace __dirname and __filename in the bundle.
    __dirname: false,
    __filename: false,
  },

  // Don't bundle node modules, except polyfills.
  externals: [
    webpackNodeExternals({
      whitelist: ['core-js', 'regenerator-runtime'],
    }),
  ],
  // Plugins
  plugins: []
};
// Exports
module.exports = config;