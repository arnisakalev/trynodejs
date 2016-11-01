"use strict";
var http = require('http');
var url = require('url');
const requestHandlers_1 = require('./requestHandlers');
const router_1 = require('./router');
class WishListParserServer {
    static start() {
        http.createServer(this.onRequest).listen(8888);
    }
    static onRequest(request, response) {
        //let pathname = url.parse(request.url).pathname;
        //console.log('Request for ' + pathname + ' received.');
        let handle = {};
        handle["/"] = requestHandlers_1.requestHandlers.root;
        handle["/start"] = requestHandlers_1.requestHandlers.start;
        handle["/upload"] = requestHandlers_1.requestHandlers.upload;
        //Router.Route(pathname, handle, response);
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        request.setEncoding("utf8");
        // request.addListener("data", function (postDataChunk) {
        //     postData += postDataChunk;
        //     console.log("Received POST data chunk '" + postDataChunk + "'.");
        // });
        request.addListener("end", function () {
            router_1.Router.Route(pathname, handle, response, postData);
        });
    }
}
exports.WishListParserServer = WishListParserServer;
//# sourceMappingURL=server.js.map