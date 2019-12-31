// Webpack configuration provided by LearnCode.academy (https://www.youtube.com/user/learncodeacademy)
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, "app"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "../app/App.js",
    output: {
        path: __dirname + "/public/assets/js/",
        publicPath: "/js/",
        filename: "app.min.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
               presets: ['@babel/preset-env','@babel/preset-react']
            }
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