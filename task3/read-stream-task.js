const fs = require('fs');
const readStream = require('./read-stream')

// хотим читать данные из потока в цикле

async function read(path) {

  let stream = fs.createReadStream(path, {highWaterMark: 60, encoding: 'utf-8'});

  let data;

  // ЗАДАЧА: написать такой readStream
  let reader = readStream(stream);

  try {
    while(null !== (data = await reader())) 
      console.log(data);
  }
  catch (err) {
    console.log(err);
  }

}

read(__filename).catch(console.error);
