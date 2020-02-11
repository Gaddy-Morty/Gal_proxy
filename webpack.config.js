
var path = require('path');
// var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

var Calendar_DIR = path.join(__dirname, './calendar/client/src');
var Gallery_DIR = path.join(__dirname, './imageCarousel/client/src');
var Recs_DIR = path.join(__dirname, './recommendations/client/src');
var Reviews_DIR = path.join(__dirname, './reviews/client/src');

module.exports = {
  mode: 'development',
  entry: {
    gallery: `${Gallery_DIR}/index.jsx`,
    reviews: `${Reviews_DIR}/index.jsx`,
    calendar: `${Calendar_DIR}/index.jsx`,
    recs: `${Recs_DIR}/index.jsx`,
  },
  output: {
    filename: '[name].bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/react']
          }
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  }
};