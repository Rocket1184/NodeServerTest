'use strict';

var http = require('http');
var fs = require('fs');

class User {
    constructor(name, isMale, age) {
        this.name = name;
        this.isMale = isMale;
        this.age = age;
    }
}

var RegApiUrlUsr = /\/api\/user\/(\w+)/;

var server = http.createServer((request, response) => {
    console.log(request.method + ': ' + request.url);
    if (request.method === 'GET') {
        if (RegApiUrlUsr.test(request.url)) {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            var ans = new User(RegApiUrlUsr.exec(request.url)[1], true, 19);
            response.write(JSON.stringify(ans));
            response.end();
        } else if (request.url === '/favicon.ico') {
            fs.createReadStream('./favicon.ico').pipe(response);
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream('./404.html').pipe(response);
        }
    }
});

// Heroku dynamically assigns your app a port,
// so you can't set the port to a fixed number.
// Heroku adds the port to the env,
// so you can pull it from there.
var serverPort = process.env.PORT || 5000;

server.listen(serverPort);

console.log(`[Rocka Node Server] Running at http://127.0.0.1:${serverPort}/`);