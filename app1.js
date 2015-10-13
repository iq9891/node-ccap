var http = require('http');
var fs = require('fs');
var url = require("url");  
var query = require("querystring"); //解析post
var ccap = require('ccap')();//Instantiated ccap class 

var txt = '';
//生成验证码 start
var ary = ccap.get();

txt = ary[0];

var buf = ary[1];

console.log('txt');
console.log(txt);
//生成验证码 end

//将验证码存到本地 start
fs.writeFile("cap.jpeg", buf, function(err) {
	if (err) {
		console.log("errro！");
	} else {
		console.log("保存成功！");
	}
});
//将验证码存到本地 end

http.createServer(function (request, response) {
	
	if(request.url == '/cap.jpg'){
		response.writeHead(200, {'Content-Type': 'image/jpg'});
		response.end(buf);
	}else if(request.url == '/r'){
		if(request.method == 'POST'){
			var postdata = "";
			request.addListener("data",function(postchunk){
				postdata += postchunk;
			})
			//POST结束输出结果
			request.addListener("end",function(){
				var params = query.parse(postdata);
				if((params.code).toUpperCase() == txt){
					response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					response.end('验证成功');
				}else{
					response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
					response.end('验证错误');
				}
			})
		}
	}else{
		if(request.method == 'GET'){

			var body = '<html>'+ 
			'<head>'+ 
			'<meta charset="utf-8" />'+ 
			'</head>'+ 
			'<body>'+ 
				'<form action="/r" method = "post">'+
					'<input name="code" type="text" />'+
					'<img src="cap.jpg" />'+
					'<input type="submit" />'+
				'</form>'
			'</body>'+ 
			'</html>'; 
			response.end(body);
		}
	}

}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');