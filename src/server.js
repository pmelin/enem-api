var restify = require('restify');
var bunyan = require('bunyan');
var setupSchoolsRoute = require('./routes/schoolRoutes');
var setupStateRoute = require('./routes/stateRoutes');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/schoolRanking');
mongoose.connection.on('open', function() {
console.log('Mongoose connected.');
});

var log = bunyan.createLogger({name: 'enem-api', stream: process.stdout});
var server = restify.createServer();

server.server.setTimeout(5000);
server.use(restify.acceptParser(server.acceptable));
server.use(restify.bodyParser({mapParams: true, mapFiles: false}));
server.use(restify.queryParser());
setupSchoolsRoute(server);
setupStateRoute(server);

server.listen(8080, function() {
  log.info('%s listening at %s', server.name, server.url);
});
