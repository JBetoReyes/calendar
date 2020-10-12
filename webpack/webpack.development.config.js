const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

module.exports = () => ({
  ...merge(baseConfig(), {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.s?css$/,
          loader: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devServer: {
      host: '0.0.0.0',
      open: false,
      historyApiFallback: true,
    },
  }),
});
