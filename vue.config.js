/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */

const { GenerateSW } = require("workbox-webpack-plugin");

const DEV = process.env.VUE_APP_DEV === "true";
const STEAM = process.env.VUE_APP_STEAM === "true";

const plugins = [];
if (!STEAM) {
  plugins.push(new GenerateSW({
    skipWaiting: true,
    clientsClaim: true,
    maximumFileSizeToCacheInBytes: 30 * 1024 * 1024,
    exclude: [/\.webm$/, /\.mp3$/, /\.map$/, /\.icns$/, /commit\.json$/],
    ignoreURLParametersMatching: [/.*/],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
        handler: "StaleWhileRevalidate",
        options: { cacheName: "google-fonts-css" }
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\//,
        handler: "CacheFirst",
        options: {
          cacheName: "google-fonts-webfonts",
          expiration: { maxAgeSeconds: 365 * 24 * 60 * 60 }
        }
      },
      {
        urlPattern: /\.mp3$/,
        handler: "CacheFirst",
        options: {
          cacheName: "audio",
          expiration: { maxAgeSeconds: 30 * 24 * 60 * 60 }
        }
      }
    ]
  }));
}

module.exports = {
  publicPath: "./",
  lintOnSave: false,
  outputDir: STEAM ? "../AppFiles" : "dist",
  configureWebpack: {
    devtool: DEV ? "eval-source-map" : "source-map",
    plugins
  }
};
