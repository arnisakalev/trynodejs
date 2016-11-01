"use strict";
var fs = require('fs');
var path = require('path');
class requestHandlers {
    static root(response) {
        response.writeHead(200, { "Content-Type": "text/html" });
        var fileStream = fs.createReadStream(path.join(process.cwd(), 'index.html'));
        fileStream.pipe(response);
    }
    static start(response, postData) {
        console.log("Request handler 'start' was called.");
        var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<form action="/upload" method="post">' +
            '<textarea name="text" rows="20" cols="60"></textarea>' +
            '<input type="submit" value="Submit text" />' +
            '</form>' +
            '</body>' +
            '</html>';
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(body);
        response.end();
    }
    static upload(response, postData) {
        console.log("Request handler 'upload' was called.");
        response.writeHead(200, { "Content-Type": "text/plain" });
        response.write("You've sent: " + postData);
        response.end();
    }
}
exports.requestHandlers = requestHandlers;
//# sourceMappingURL=requestHandlers.js.map