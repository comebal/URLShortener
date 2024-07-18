const http = require('http');
const app = require('./src/app');

const port = process.env.PORT || 3000;

// http server
app.set('port', port);
const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Listening at port ${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown(signal) {
  console.log(`Received ${signal} signal, shutting down gracefully`);

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
}
