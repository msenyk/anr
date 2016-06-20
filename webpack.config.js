module.exports = {
  entry: './client/js/app.jsx',

  output: {
    filename: 'client/bundle.js',
    publicPath: ''
  },

  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }
}