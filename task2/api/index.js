let fs = require('fs');

module.exports = {
    getMainPage(res, req) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        const file = new fs.createReadStream('./public/index.html', 'utf8');
        file.pipe(res)
    },

    getFile(res, req) {
        let filePath = req.url.substr(1);
        if (filePath.includes('/') || filePath.includes('..')) {
            res.statusCode = 400;
            res.end('Nested paths are not allowed');
        }
        try {
            fs.statSync(`./files/${filePath}`);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            const file = new fs.createReadStream(`./files/${filePath}`, 'utf8');
            file.pipe(res)
        } catch (err) {
            res.statusCode = 404;
            res.end('Page not found')
        }
    },

    postFile(res, req) {
        let filePath = req.url.substr(1);
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        const file = new fs.createWriteStream(`./files/${filePath}`, 'utf8');
        fs.exists(`./files/${filePath}`, function (exists) {
            if (exists) {
                res.statusCode = 409;
                res.end('File exits')
            }
        })
        data = "Hello World"
        let dataLength = 0;
        file.on('data', function (chunk) {
            if (dataLength > 1e6) {
                file.destroy()
            }
            dataLength += chunk.length;
          })

        file.write(data, err => {
            if (err) {
                console.log(err.message)
            } else {
                console.log('written');
            }
        })
    },

    deleteFile(res, req) {
        let filePath = req.url.substr(1);
        fs.exists(`./files/${filePath}`, function (exists) {
            console.log(exists)
            if (exists) {
                fs.unlink(`./files/${filePath}`, function (err) {
                    if (err) {
                        console.log(err);
                    };
                    res.end('file deleted');
                });
            } else {
                res.statusCode = 404;
                res.end('Page not found')
            }
        });
    }
}