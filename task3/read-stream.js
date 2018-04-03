const { removeListeners } = require('./utils.js');
const { ReadStream } = require('fs');

Object.assign(ReadStream.prototype, { removeListeners });

function readStream(stream) {
    return () => {
        return new Promise((resolve, reject) => {
            stream.removeListeners('data', 'error', 'end');
            let data = '';
            stream.on('data', (chunk) => {
                resolve(chunk);
            });
            stream.on('error', (error) => {
                reject(error);
            });
            stream.on('end', () => {
                resolve(null);
            });
        });
    }
}

module.exports = {
    readStream
}