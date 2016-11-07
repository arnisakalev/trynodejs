import http = require('http');
import url = require('url');
import { requestHandlers } from './requestHandlers';
import { Router } from './router';

export class WishListParserServer {
    static start() {
        http.createServer(this.onRequest).listen(8888);
    }

    static onRequest(request, response) {
        let handle = {}
        handle["/"] = requestHandlers.root;
        handle["/start"] = requestHandlers.start;
        handle["/file"] = requestHandlers.file;
        handle["/upload"] = requestHandlers.upload;

        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        });

        request.addListener("end", function () {
            Router.Route(pathname, handle, response, postData);
        });

    }
}