let http = require('http');
let fs = require('fs');
let path = require('path');

new http.Server((req, res) => {
    if (req.url === '/' && req.method === "GET") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        const file = new fs.createReadStream(__dirname + '/public/index.html', 'utf8');
        file.pipe(res)

    } else if (req.url === '/file.txt' && req.method === "GET") {
        var filePath = req.url.substr(1);
        try {
            fs.statSync(__dirname + '/files/file.txt');
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            const file = new fs.createReadStream(__dirname + '/files/file.txt', 'utf8');
            file.pipe(res)
        } catch (err) {
            res.statusCode = 404;
            res.end('Page not found')
        }
    } else if (req.url === '/file.txt' && req.method === "POST") {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        const file = new fs.createWriteStream(__dirname + '/files/file.txt', 'utf8');
        fs.exists('./files/file.txt', function (exists) {
            if (exists) {
                res.statusCode = 409;
                res.end('File exits')
            }
        })
        let data = "Hello world";
        file.write(data, err => {
            if (err) {
                console.log(err.message)
            } else {
                console.log('written');
            }
        })

    } else if (req.url === '/file.txt' && req.method === "DELETE") {
        fs.exists('./files/file.txt', function (exists) {
            if (exists) {
                fs.unlink('./files/file.txt');
                res.status = 200;
                res.end("Successfully deleted")
            } else {
                console.log('File not found, so not deleting.');
            }
        });
    }

}).listen(3000);
