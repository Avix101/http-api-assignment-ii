const http = require('http');
const urlLib = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlHandler');
const jsonHandler = require('./jsonHandler');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handlePost = (req, res, url) => {
  if (url.pathname === '/addUser') {
    const bodyStream = [];

    req.on('error', () => {
      res.statusCode = 400;
      res.end();
    });

    req.on('data', (dataChunk) => {
      bodyStream.push(dataChunk);
    });

    req.on('end', () => {
      const bodyString = Buffer.concat(bodyStream).toString();
      const bodyParams = query.parse(bodyString);

      jsonHandler.addUser(req, res, bodyParams);
    });
  }
};

const handleHead = (req, res, url) => {
  switch (url.pathname) {
    case '/getUsers':
      jsonHandler.getUsersMeta(req, res);
      break;
    case '/notReal':
      jsonHandler.getNonExistantMeta(req, res);
      break;
    default:
      jsonHandler.getNonExistantMeta(req, res);
      break;
  }
};

const handleGet = (req, res, url) => {
  switch (url.pathname) {
    case '/':
      htmlHandler.getClient(req, res);
      break;
    case '/client.html':
      htmlHandler.getClient(req, res);
      break;
    case '/style.css':
      htmlHandler.getCSS(req, res);
      break;
    case '/getUsers':
      jsonHandler.getUsers(req, res);
      break;
    case '/notReal':
      jsonHandler.getNonExistant(req, res);
      break;
    default:
      jsonHandler.getNonExistant(req, res);
      break;
  }
};

const onRequest = (req, res) => {
  const parsedUrl = urlLib.parse(req.url);

  switch (req.method) {
    case 'POST':
      handlePost(req, res, parsedUrl);
      break;
    case 'HEAD':
      handleHead(req, res, parsedUrl);
      break;
    case 'GET':
      handleGet(req, res, parsedUrl);
      break;
    default:
      handleGet(req, res, parsedUrl);
      break;
  }
};

http.createServer(onRequest).listen(port);
