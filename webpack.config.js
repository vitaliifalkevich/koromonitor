const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = (env, args) => {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(scss|css)$/,
          // exclude: /node_modules/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|gif)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/images/[name].[ext]',
                emitFile: true,
              },
            },
          ],
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'fonts/[name].[ext]',
                emitFile: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/app.css',
      }),
    ],
    watch: true,
    output: {
      path: __dirname + '/builds/',
      filename: 'js/app.js',
      publicPath: '../',
      sourceMapFilename: 'js/[name].js.map',
    },
    devtool: args.mode === 'production' ? 'none' : 'inline-source-map',
    devServer: {
      port: 3005,
      host: 'localhost',
      historyApiFallback: true,
    },
  };
};
