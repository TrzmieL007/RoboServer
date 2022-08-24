const http = require('http');
const io = require('socket.io')(http);
const HTTP_PORT = 8184;
const handler = require('./src/handler').handler;

const server = http.createServer(handler);

server.listen(HTTP_PORT,() => console.log(`listening on http://localhost:${HTTP_PORT}/`));