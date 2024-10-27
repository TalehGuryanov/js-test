const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const fs = require("fs");

const pagesDir = path.resolve(__dirname, "src/pages");

const generateEntryPoints = () => {
  const entries = {};

  fs.readdirSync(pagesDir).forEach((dir) => {
    const fullDir = path.join(pagesDir, dir);

    if (fs.statSync(fullDir).isDirectory()) {
      fs.readdirSync(fullDir).forEach((file) => {
        if (file.endsWith(".js")) {
          const name = path.join(dir, file.split(".").slice(0, -1).join("."));

          entries[name] = path.join(fullDir, file);
        }
      });
    }
  });
  return entries;
};

const generateHtmlPlugins = () => {
  return fs.readdirSync(pagesDir).flatMap((dir) => {
    const fullDir = path.join(pagesDir, dir);

    if (fs.statSync(fullDir).isDirectory()) {
      return fs
        .readdirSync(fullDir)
        .filter((file) => file.endsWith(".html"))
        .map((file) => {
          const name = path.join(dir, file.split(".").slice(0, -1).join("."));

          return new HtmlWebpackPlugin({
            template: path.join(fullDir, file),
            filename: `${name}.html`,
            chunks: ["main", name],
            inject: true,
          });
        });
    }
    return [];
  });
};

const config = {
  entry: {
    main: ["./src/scripts/main.js", "./src/styles/main.scss"],
    ...generateEntryPoints(),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...generateHtmlPlugins(),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: ["/index"],
    hot: true,
  },
};

module.exports = config;
