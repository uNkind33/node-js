const db = require('./fake-db/index');
const { Server } = require('http');

const server = new Server((req, res) => {
    const userId = req.url.replace('/api/users', '').substring(1);
    function cb(err, data) {
        if (!data) {
            res.writeHead(200);
            res.end();
            return;
        }

        if (err) {
            console.error(err.stack);
            res.writeHead(500, 'Server error');
            res.end();
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    }   

    checkRequest = (callBack) => {
        let rawData = '';
        req.setEncoding('utf8');
        req.on('data', chunk => rawData += chunk);
        req.on('end', () => {
            callBack(JSON.parse(rawData), cb);
        });
    }

    if (req.url === "/api/users") {
        switch (req.method) {
            case 'GET':
            db.getCollection(cb);
                break;
            case "POST":
                checkRequest(db.create)
            default:
                res.writeHead(500, 'Server error');
                res.end();
        }
        return;
    }

    if(userId) {
        switch (req.method) {
            case 'GET':
                db.getById(userId, cb);
                break;
            case 'PUT':
            checkRequest(db.update);
                break;
            case 'DELETE':
                db.remove(userId, cb);
                break;
            default:
                res.writeHead(500, 'Server error');
                res.end();
        }
        return;
    }
      
    res.writeHead(500, 'Not found');
    res.end();

});

server.listen(3000, function(){
    console.log("Сервер начал прослушивание запросов на порту 3000");
});
