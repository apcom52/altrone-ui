module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {  test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};