const path = require('path')

const nodeExternals = require('webpack-node-externals')

const DotEnvPlugin = require('dotenv-webpack')
const StartServerPlugin = require('start-server-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const {
  BannerPlugin,
  NamedModulesPlugin,
  HotModuleReplacementPlugin,
  NoEmitOnErrorsPlugin
} = require('webpack')

module.exports = [
  // Build once
  {
    entry: './src/index.js',
    name: 'digest',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js'
    },
    node: {
      __filename: true,
      __dirname: true
    },
    target: 'node',
    devtool: 'source-map',
    externals: [
      nodeExternals()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new DotEnvPlugin({ safe: true, systemvars: true }),
      new BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),
      new CopyWebpackPlugin([
        { from: 'src/resources', to: path.join(__dirname, 'build', 'resources'), force: true }
      ])
    ]
  },
  // Watch for changes and hot reload
  {
    entry: [
      'webpack/hot/poll?1000',
      './src/index.js'
    ],
    name: 'watch',
    watch: true,
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js'
    },
    node: {
      __filename: true,
      __dirname: true
    },
    target: 'node',
    devtool: 'source-map',
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new DotEnvPlugin({ safe: true, systemvars: true }),
      new StartServerPlugin('index.js'),
      new NamedModulesPlugin(),
      new HotModuleReplacementPlugin(),
      new NoEmitOnErrorsPlugin(),
      new BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),
      new CopyWebpackPlugin([
        { from: 'src/resources', to: path.join(__dirname, 'build', 'resources'), force: true }
      ])
    ]
  }
]
