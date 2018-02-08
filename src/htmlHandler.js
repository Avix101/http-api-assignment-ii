const fs = require('fs');

const respondWithFile = (req, res, pathToFile, statusCode, contentType) => {
  fs.readFile(pathToFile, (error, data) => {
    if (error) {
      throw error;
    }

    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.write(data);
    res.end();
  });
};

const getClient = (req, res) => {
  respondWithFile(req, res, `${__dirname}/../client/client.html`, 200, 'text/html');
};

const getCSS = (req, res) => {
  respondWithFile(req, res, `${__dirname}/../client/style.css`, 200, 'text/css');
};

module.exports = {
  getClient,
  getCSS,
};
