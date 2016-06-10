'use strict';
const http = require('http');
const redis = require('redis');
let client = redis.createClient();

const MAX_LIST_SIZE = 5;
const LIST_TTL = 10;
const PORT = '8000';
const HOSTNAME = 'localhost';

const cKey = 'a1b2c3d4e5f6g7h8';
let i = 0;

const saveRequest = (cKey, cb) => {
	client.lpush(cKey, i++, (err, listSize) => {
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
    saveRequest(cKey);
});

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	saveRequest(cKey, (l) => {
		res.end(l + '\n');
	});
});

server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
