function readStream(stream) {
    return () => {
        return new Promise((resolve, reject) => {
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