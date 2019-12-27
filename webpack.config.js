// Webpack configuration provided by LearnCode.academy (https://www.youtube.com/user/learncodeacademy)
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, "app"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./app/App.js",
  output: {
    path: __dirname + "/public/assets/js/",
    publicPath: "/js/",
    filename: "app.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
}