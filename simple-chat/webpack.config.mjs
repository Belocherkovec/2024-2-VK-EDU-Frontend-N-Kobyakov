import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'build');
const PUBLIC_PATH = path.resolve(SRC_PATH, 'public');

export default {
  context: SRC_PATH,
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: SRC_PATH,
    },
    watchFiles: [path.join(SRC_PATH, '/**/*')]
  },
  entry: {
    index: './app/index.js',
  },
  infrastructureLogging: { level: 'error' },
  module: {
    rules: [
      {
        include: SRC_PATH,
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        include: SRC_PATH,
        test: /\.module.css$/,
        use: ['raw-loader'],
      },
      {
        exclude: /\.module\.css$/, // Исключаем модульные CSS файлы
        include: SRC_PATH,
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        resolve: {
          fullySpecified: false
        },
        test: /\.m?js/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        generator: {
          filename: 'icons/[name][ext]', // Оставляем оригинальное имя файла
        },
        test: /\.ico$/,
        type: 'asset/resource', // Используется встроенная поддержка ассетов в Webpack 5
      },
    ],
    strictExportPresence: true,
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_PATH,
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'public/index.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(PUBLIC_PATH, 'index.html'),
    }),
    new CleanWebpackPlugin({
      verbose: true
    }),
  ],
  resolve: {
    alias: {
      "@app": path.resolve(SRC_PATH, 'app'),
      "@components": path.resolve(SRC_PATH, 'components'),
      "@consts": path.resolve(SRC_PATH, 'consts'),
      "@features": path.resolve(SRC_PATH, 'features'),
      "@icons": path.resolve(SRC_PATH, 'icons'),
      "@img": path.relative(SRC_PATH, 'img'),
      "@public": path.resolve(SRC_PATH, 'public'),
      "@utils": path.resolve(SRC_PATH, 'utils')
    }
  },
  stats: 'errors-warnings'
}
