
const fs = require("fs");

async function readProxy(method = "GET", uriPath = "") {

  let opts = {
    method,
    hostname: "localhost",
    port: 5001,
    path: uriPath,
    requestCert: false,
    rejectUnauthorized: false,
    key: await fs.promises.readFile(`${homedir}/.aspnet/https/mywebapplication.key`),
    cert: await fs.promises.readFile(`${homedir}/.aspnet/https/mywebapplication.pem`)
    // ca: fs.readFileSync(`${__dirname}/cacert.pem`)
  };

  return opts;
}


function readFile(basePath, filename, res) {
  fs.readFile(`${basePath}/json-responses/${filename}`, "utf8", (err, data) => {
    res.status(200);
    res.end(data);
  });
}

function readFileSync(basePath, filename, res) {

  return new Promise((res, rej) => {

    fs.readFile(`${basePath}/json-responses/${filename}`, "utf8", (err, data) => {
      res(data);
    });
  });
}

module.exports.readProxy = readProxy;
module.exports.readFile = readFile;
module.exports.readFileSync = readFileSync;
