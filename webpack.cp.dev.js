var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var app_config = require('./appconfig.js');

var devServer = app_config.getDevServer();

// console.log((devServer.gatewayHost?devServer.gatewayHost:devServer.ip));
var wp1 = 'webpack-dev-server/client?http://' + (devServer.gatewayHost?devServer.gatewayHost:devServer.ip) + ':' + devServer.port;
var wp2 = 'webpack/hot/only-dev-server';
var entries = {
  // webdev:[
  // wp1,wp2
  // ]
};
var htmls = [];

(function getAllFiles(root) {
  var files = fs.readdirSync(root);
  files.forEach(function(file) {
    var pathname = root + '/' + file,
      stat = fs.lstatSync(pathname);

    if (!stat.isDirectory()) {
      if(file.endsWith('.jsx') && file !== 'Test.jsx'){
        var entryName = file.substr(0,file.length-4);
        entries[entryName] = [root + '/' + entryName, wp1, wp2];
      }else if(!pathname.endsWith('devtests/index.html') && file.endsWith('.html')){
        htmls.push(pathname);
      }
    } else {
      getAllFiles(pathname);
    }
  });
})('./devtests');

var body='';
htmls.forEach((f)=>{
  var fp = f.substr(11);
  var tagA = `<p><a href="${fp}">${fp}</a></p>\n`;
  body+=tagA;
  console.log(tagA);
});

var htmlcontent = `<!DOCTYPE html>\n<html>\n<body>\n${body}</body>\n</html>\n`;
fs.writeFile('./devtests/index.html', htmlcontent);

module.exports = {
  devtool: 'eval',
  entry: entries,
  output: {
    path: path.join(__dirname, 'app/js'),
    filename: '[name].js',
    publicPath: '/debug/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.jsx$|\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [path.join(__dirname, 'src'), path.join(__dirname, 'devtests')]
    }]
  },
  resolve: {
    root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'devtests')],
    extensions: ['', '.jsx', '.js', '.css'],
    alias: app_config.alias
  }
};
