var webpack = require('webpack');

module.exports = {
  entry: {
    main:[
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    "./src/javascripts/index.js"
    ]
  },
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "index.js"
  },
  module: {
    rules: [
      { 
        test:   /\.(css|less)$/, 
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      },
      { test: /\.js|jsx$/, loader: 'babel-loader' },
      { test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url-loader'},
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};