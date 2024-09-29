import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from 'url';
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');

export default {
  module: {
    rules: [
      {
        use: 'babel-loader',
        include: SRC_PATH,
        test: /\.js$/,
      },
      {
        test: /\.module.css$/,
        use: ['raw-loader'],
        include: SRC_PATH,
      },
      {
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
        exclude: /\.module\.css$/, // Исключаем модульные CSS файлы
        include: SRC_PATH,
        test: /\.css$/,
      },
      {
        resolve: {
          fullySpecified: false
        },
        test: /\.m?js/
      },
      {
        use: [
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
            loader: 'file-loader',
          },
        ],
        test: /\.(png|jpe?g|gif|svg)$/,
      },
    ],
    strictExportPresence: true,
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'index.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    static: {
      directory: SRC_PATH,
    },
    watchFiles: [path.join(SRC_PATH, '/**/*')],
    open: true,
    port: 3000,
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH,
  },
  infrastructureLogging: { level: 'error' },
  entry: {
    index: './index.js',
  },
  stats: 'errors-warnings',
  context: SRC_PATH,
}
