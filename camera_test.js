var spawn = require('child_process').spawn,
child = spawn('/opt/vc/bin/raspivid', ['-t', '0', '-w', '300', '-h', '300', '-hf', '-fps', '20', '-o', '-' ]);

var http = require("http");
var server = http.createServer(function(request, response) {
    child.stdout.pipe(response);
});

server.listen(4567);
console.log("Server is listening");