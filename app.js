var http = require('http');
var ccap = require('ccap')();

http.createServer(function (request, response) {
	
	if(request.url == '/favicon.ico')return response.end('');//Intercept request favicon.ico

    var ary = ccap.get();

    var txt = ary[0];

    var buf = ary[1];

    response.end(buf);

    console.log(txt);

}).listen(8124);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8124/');