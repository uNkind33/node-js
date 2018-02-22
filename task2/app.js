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
        let filePath = req.url.substr(1);
        try {
            fs.statSync(__dirname + `/files/${filePath}`);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            const file = new fs.createReadStream(__dirname + `/files/${filePath}`, 'utf8');
            file.pipe(res)
        } catch (err) {
            res.statusCode = 404;
            res.end('Page not found')
        }
    } else if (req.url === '/file.txt' && req.method === "POST") {
        let filePath = req.url.substr(1);
        console.log(filePath)
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        const file = new fs.createWriteStream(__dirname + `/files/${filePath}`, 'utf8');
        fs.exists(`/files/${filePath}`, function (exists) {
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
        console.log(req.method)
        let filePath = req.url.substr(1);
        console.log(`/files/${filePath}`)
        fs.exists(`/files/${filePath}`, function (exists) {
            if (exists) {
                console.log('inside')
                fs.unlink(`/files/${filePath}`);
                res.status = 200;
                res.end("Successfully deleted")
            } else {
                res.statusCode = 404;
                res.end('Page not found')
            }
        });
    }

}).listen(3000);
