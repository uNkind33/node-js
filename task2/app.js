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
        // var filename = path.basename('../files/file.txt');

        // sendFile(file, res);

    } else if (req.url === '/file.txt' && req.method === "GET") {
        console.log(req.url)
        var filePath = req.url.substr(1);
        console.log(filePath)
        // res.writeHead(404, 'Not found');
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

        // if (fs.statSync(__dirname + '/files/file.txt'), err) {
        //     res.writeHead(200, {
        //         'Content-Type': 'text/plain'
        //     })
        //     const file = new fs.createReadStream(__dirname + '/files/file.txt', 'utf8');
        //     file.pipe(res)
        // } else {
        //     res.writeHead(404, {
        //         'Content-Type': 'text/plain'
        //     })
        //    res.end('Page not found')
        // }
    } else if (req.url === '/file.txt' && req.method === "POST") {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        const file = new fs.createWriteStream(__dirname + '/files/file.txt', 'utf8');
        let data = "Hello world";
        file.write(data, err => {
            if (err) {
                console.log(err.message)
            } else {
                console.log('written');
            }
        })
    }

    // if (req.url == '/test') {
    //     console.log(req.url)
    //     let file = new fs.ReadStream('file.txt', {encoding: 'utf-8'});
    //     sendFile(file, res);
    // }

    // if( req.url == '/file') {

    // }
}).listen(3000);

function sendFile(file, res) {
    file.pipe(res)
    file.on('error', function (err) {
        res.statusCode = 500;
        res.end('Server Error');
        console.log(err)
    })
    // file.on('data', chunk => {     res.write(chunk); }); file.on('end', () => {
    // res.end(); });
}

// function sendFile(file, res) {     file.on('data', chunk => {
// res.write(chunk);     });     file.on('end', () => {         res.end(); }); }