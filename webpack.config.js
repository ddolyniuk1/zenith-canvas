const path = require('path');

module.exports = { 
  entry: './src/main.ts',
  output: {
    filename: 'zenith-canvas.min.js',
    path: path.resolve(__dirname, 'public', 'js'),
    publicPath: '/public/js', // instead of publicPath: '/build/' 
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    devMiddleware: {
        writeToDisk: false, 
    },
    compress: true,
    port: 8080
  }
};