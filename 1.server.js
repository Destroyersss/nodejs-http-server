const http = require("http");

/**
 * content-type
 * charset
 */
const server = http.createServer(function (req, res) {
  console.log(req.method, req.url);
  // console.log(req.headers);

  if (req.url === "/") {
    res.writeHead(200);
    res.end("<h1>home page</h1>");
  } else if (req.url === "/company") {
    res.writeHead(200);
    res.end("<h1>company</h1>");
  } else if (req.url === "/news") {
    res.writeHead(200);
    res.end("<h1>News</h1>");
  } else {
    res.writeHead(404);
    res.end("<h1>404 Not Found</h1><div>Страница не найдена</div>");
  }
});

server.listen(4000);
