var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.cp.dev');
var app_config = require('./appconfig.js');

var devServer = app_config.getDevServer();

var compiler = webpack(config);
console.log('Starting Webpack Dev Server....');
var cmdport = Number.isInteger(Number.parseInt(process.argv[3]))?process.argv[3]:(Number.isInteger(Number.parseInt(process.argv[2]))?process.argv[2]:devServer.port);
var proxyCfg = {};

proxyCfg[app_config.defaultDevServer.apiBashPath] = {
  target: app_config.defaultDevServer.apiAddress,
  secure: false,
  rewrite: function(req, proxyOptions){
    proxyOptions.host=app_config.defaultDevServer.apiHost;
  }
};

var devServerInstance = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: true,
  colors: true,
  historyApiFallback: true,
  proxy: proxyCfg
});
devServerInstance.listen(cmdport, '0.0.0.0', function(err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + devServer.hostname + ':' + cmdport);
  console.log('Access address: http://' + devServer.ip + ':' + cmdport);
});
