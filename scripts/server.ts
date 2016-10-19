var http = require("http");
var url = require("url");

export class WishListParserServer {

    static start() {
        http.createServer(this.onRequest).listen(8888);
    }

    static onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write('парам пам пам');
        response.end();
    }
}