var webpack = require('webpack');
var path = require("path");

const entry_config  = {
  base_path: "./src/javascripts/app/",
  entries : {
    index: "index.js",
    movie: "movie.js",
    book: "book.js",
    search: "search.js",
    user: "user.js",
    review: "review.js",
    notification: "notification.js",
    sign_up: 'sign_up.js',
    sign_in: 'sign_in.js'
  },
  extra_in_each_entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
  ]
}

let entries = {};

for( let e in entry_config.entries ) {
  entries[e] = entry_config.extra_in_each_entry.concat(path.resolve(entry_config.base_path,entry_config.entries[e]))
}

module.exports = {
  entry: entries,
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "[name].js"
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