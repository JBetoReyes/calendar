const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { existsSync } = require('fs');
const { resolve } = require('path');
const dotenv = require('dotenv');

module.exports = (env) => {
  const rootPath = resolve(__dirname, '..');
  const srcPath = resolve(rootPath, 'src');
  const baseEnvPath = resolve(rootPath, '.env');
  const envPath = `${baseEnvPath}.${env.ENVIRONMENT}`;
  const finalPath = existsSync(envPath) ? envPath : baseEnvPath;
  const envObject = dotenv.config({ path: finalPath }).parsed;
  const envKeys = Object.keys(envObject).reduce(
    (keys, nextKey) => ({
      ...keys,
      [`process.env.${nextKey}`]: JSON.stringify(envObject[nextKey]),
    }),
    {}
  );
  console.log('env keys ', envKeys);
  return {
    entry: resolve(srcPath, 'app', 'index.tsx'),
    output: {
      filename: 'app-[hash:6].js',
      path: resolve(rootPath, 'dist'),
      // tells webpack where to look for the static assets
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@styles': resolve(srcPath, 'public', 'styles'),
      },
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlPlugin({
        template: resolve(srcPath, 'public', 'index.html'),
        filename: 'index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: {
            loader: 'awesome-typescript-loader',
          },
        },
      ],
    },
  };
};
