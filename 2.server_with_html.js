const http = require("http");

const tpl = (content, foo) => {
  console.log("content:", content);
  console.log("foo:", foo);

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/news">News</a>
    <a href="/random_page">Random page</a>
  </nav>
    ${content}

    <hr />
    текущий адрес: ${foo}
  </body>
  </html>`;
};

const server = http.createServer(function (req, res) {
  console.log(req.method, req.url);
  // console.log(req.headers);

  let responseHeaders = {
    privet: "kak dela",
    "Content-Type": "text/html; charset=UTF-8",
  };

  if (req.url === "/") {
    res.writeHead(200, "", responseHeaders);
    res.end(tpl("<h1>home page</h1>", req.url));
  } else if (req.url === "/about") {
    res.writeHead(200, "", responseHeaders);
    res.end(tpl("about", req.url));
  } else if (req.url === "/news") {
    res.writeHead(200, "", responseHeaders);
    res.end(tpl("News", req.url));
  } else {
    res.writeHead(404, "", {
      privet: "kak dela",
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(tpl("<p>страница не найдена</p>", req.url));
  }
});

server.listen(4000);
