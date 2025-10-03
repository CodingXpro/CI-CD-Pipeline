const http = require('http');

const PORT = 5000;

const server = http.createServer((req, res) => {
  res.end('Hello from Node.js on Docker with GitHub Actions!');
});

server.listen(PORT, () => {
  console.log(`hello Note Krishna Server running on http://localhost:${PORT}`);
});
