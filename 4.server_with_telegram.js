const fs = require("fs");
const http = require("http");
const url = require("url");

const tpl = (content, foo) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
  <nav>
    <a href="/">Home</a>
    <a href="/news">News</a>
    <a href="/random_page">Random page</a>
  </nav>
    ${content}

    
    <hr />
    текущий адрес: ${foo}
    <script src="app_telegram_ANOTHER_NAME.js"></script>
  </body>
  </html>`;
};

const server = http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url, true);

  console.log(req.method, req.url);
  let responseHeaders = {
    "Content-Type": "text/html; charset=UTF-8",
  };

  if (req.url === "/") {
    res.writeHead(200, "", responseHeaders);
    res.end(
      tpl(
        `
    <h1>home page</h1>
    <textarea id="msg"></textarea>
    <br /> 
    <button id="send_to_file">Send to File</button>
    <button id="send_to_telegram">Send to Telegram</button>
    `,
        req.url
      )
    );
  } else if (parsedUrl.pathname === "/api_send2file") {
    let msg = parsedUrl.query.msg;

    fs.writeFile("./file_for_write.txt", msg, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    res.writeHead(200, "", responseHeaders);
    res.end(tpl("News", req.url));
  } else if (req.url === "/news") {
    res.writeHead(200, "", responseHeaders);
    res.end(tpl("News", req.url));
  } else if (req.url === "/styles.css") {
    res.writeHead(200, "", {
      "Content-Type": "text/css; charset=UTF-8",
    });
    res.end(`body {background: #f0f8ff}`);
  } else if (req.url === "/app_telegram_ANOTHER_NAME.js") {
    res.writeHead(200, "", {
      "Content-Type": "text/plain; charset=UTF-8",
    });
    fs.readFile("./client/app_for_telegram.js", "utf8", function (err, data) {
      if (err) {
        return console.log(err);
      }
      res.end(data);
    });
  } else {
    res.writeHead(404, "", {
      privet: "kak dela",
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(tpl("<p>страница не найдена</p>", req.url));
  }
});

server.listen(4000);
