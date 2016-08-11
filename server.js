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

var server = http.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    if (request.method === 'GET' && RegApiUrlUsr.test(request.url)) {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        var ans = new User(RegApiUrlUsr.exec(request.url)[1], true, 19);
        response.write(JSON.stringify(ans));
        response.end();
    } else {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream("D:\\Documents\\WorkSpace\\2016.8.1 NodejsLearning\\06 Server\\404.html").pipe(response);
    }
});

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');