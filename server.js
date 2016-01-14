var http = require('http');
var qs = require('querystring');
var parser = require('url').parse;

var server = http.createServer(function(req, res) {
  var url = req.url;

  if (url === '/time') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write( ( new Date() ).toDateString() );
    res.end();
  } else if (url.substring(0, 6) === '/greet') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if (req.method === 'GET') { //ex: greet/George
      res.write('Hi ' + req.url.substring(7));
      res.end();
    } else if (req.method === 'POST') { //urlencoded data only
      getBody(req, function(name) {
        res.write('Hi ' + name);
        res.end();
      });
    } else {
      res.write('no name received');
      res.end();
    }
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('invalid url');
    res.end();
  }

  function getBody (req, cb) {
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      var name = body.toString().substring(5);
      cb(name);
    });
  }

});

module.exports = server;
