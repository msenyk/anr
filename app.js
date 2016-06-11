'use strict';
const http = require('http');
const redis = require('redis');
let client = redis.createClient();

const MAX_LIST_SIZE = 5;
const MAX_BODY_SIZE = 1 * 1024;
const LIST_TTL = 10;
const PORT = '8000';
const HOSTNAME = 'localhost';

const cKey = 'a1b2c3d4e5f6g7h8';
let i = 0;

const saveRequest = (cKey, value, cb) => {
	client.lpush(cKey, (i++) + ' ' + JSON.stringify(value, null, '  '), (err, listSize) => {
    	console.log('size: ' + listSize);
    	if ( listSize > MAX_LIST_SIZE ) {
    		client.rpop(cKey);
    		console.log('The oldest item was removed');
    	}
    });
    client.expire(cKey, LIST_TTL);
    client.lrange(cKey, 0, MAX_LIST_SIZE, (err, reply) => {
    	console.log('list: ' + reply);
    	if ( cb ) {
    		cb(reply);
    	}
    });
};

client.on('connect', () => {
    console.log('connected');
    //saveRequest(cKey);
});

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain;charset=utf8');
	const today = new Date();
	const value = {
		created: today.toUTCString(),
		ip: req.connection.remoteAddress,
		method: req.method,
		url: req.url,
		headers: req.headers
	};
	const body = [];
	let bodySize = 0;
	//req.setEncoding('utf8');
	req.on('data', (chunk) => {
		console.log('chunk: ' + chunk);
		if ( bodySize < MAX_BODY_SIZE ) {
			if ( bodySize + chunk.length > MAX_BODY_SIZE ) {
				console.log('Skip end of body');
				const trimmedLength = MAX_BODY_SIZE - bodySize;
				console.log('trimmed length: ' + trimmedLength);
				chunk = chunk.slice(0, trimmedLength);

			}
			body.push(chunk);
			bodySize += chunk.length;
		}
	});
	req.on('end', () => {
		value.body = Buffer.concat(body).toString();
		console.log('end of body\n' + value.body);

		saveRequest(cKey, value, (l) => {
			res.end(l.join('\n') + '\n');
		});
	});
	
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
