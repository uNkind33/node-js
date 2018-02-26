let http = require('http');
let fs = require('fs');
let path = require('path');
const ServerApi = require('./api')

new http.Server((req, res) => {
    if (req.url === '/' && req.method === "GET") {
        ServerApi.getMainPage(res, req)

    } else if (req.method === "GET") {
        ServerApi.getFile(res, req)

    } else if (req.method === "POST") {
        ServerApi.postFile(res, req);

    } else if (req.method === "DELETE") {
        ServerApi.deleteFile(res, req);

    } else {
        res.statusCode = 500;
        res.end('Server Error')
    }

}).listen(3000);