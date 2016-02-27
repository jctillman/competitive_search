var express = require('express');
var httpProxy = require('http-proxy');

var apiForwardingUrl = 'https://damp-cove-13155.herokuapp.com';

var server = express();
server.set('port', 8888);
server.use(express.static(__dirname + '/public'));

var apiProxy = httpProxy.createProxyServer({secure:false});

console.log('Forwarding API requests to ' + apiForwardingUrl);

server.all("/remote/*", function(req, res) {
	console.log(req.host)
	console.log(req.hostName)
	req.host='https://damp-cove-13155.herokuapp.com'
    apiProxy.web(req, res, {target: apiForwardingUrl});
});

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});