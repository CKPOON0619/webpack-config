const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
  plugins: [new HtmlWebpackPlugin({
    template:"./src/template.html"
  }), new MiniCssExtractPlugin()],
  entry: './src/index.ts',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test:/\.css?$/,
        use: [MiniCssExtractPlugin.loader,"css-loader"]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader:"babel-loader"
        }  
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpeg|gif|svg)$/,
        loader: "file-loader",
        options:{
          name:"[name].[hash].[ext]",
          outputPath:"assets"
        }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};