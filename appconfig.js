var path = require('path');
var os = require('os');
var dns = require('dns');

var hostname = os.hostname();


module.exports = {
  defaultDevServer: {
    defaultIP: 'localhost',
    defaultPort: 3000,
    apiHost: 'open.iciba.com',
    apiAddress: 'http://open.iciba.com:80/',
    apiBashPath: '/dsapi/*',
    gatewayHost: 'localhost'
  },
  alias: {
    'AppCss': path.resolve(__dirname, 'src/css/app')
  },
  entry: {
    main: path.resolve(__dirname, 'src/main'),
    index: path.resolve(__dirname, 'src/index')
  },
  getDevServer: function() {
    var interfaces = os.networkInterfaces();
    var server = {
      hostname: hostname,
      port: this.defaultDevServer.defaultPort,
      ip: null,
      gatewayHost: this.defaultDevServer.gatewayHost
    };
    for (var k in interfaces) {
      for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
          server.ip = (address.address);
          break;
        }
      }
      if (server.ip !== null) {
        break;
      }
    }

    if (server.ip === null) {
      server.ip = this.defaultDevServer.defaultIP;
    }
    return server;
  }
};
