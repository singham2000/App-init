var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
  
    res.end(`Server is running on http://localhost:${process.env.PORT}`);
}).listen(process.env.PORT);