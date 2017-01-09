"use strict";
const fs = require('fs');
const path = require('path');
const wishlistparser_1 = require('./wishlistparser');
class requestHandlers {
    static root(response) {
        response.writeHead(200, { "Content-Type": "text/html" });
        let indexStream = fs.createReadStream(path.join(process.cwd(), '/client/index.html'));
        indexStream.pipe(response);
    }
    static parse(response, postData) {
        //console.log("Request handler 'parse' was called.");
        //проверить таску в коллекции
        let data = JSON.parse(postData);
        let already;
        if (requestHandlers.parsers !== undefined && requestHandlers.parsers.length > 0) {
            already = requestHandlers.parsers.find(myObj => myObj.Token == data.token);
        }
        if (already === undefined) {
            already = new wishlistparser_1.WishListParser(data.id, data.token);
            already.ParseWishList();
            requestHandlers.parsers.push(already);
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(already.Result));
        response.end();
    }
    static js(response) {
        response.writeHead(200, { "Content-Type": "text/javascript" });
        let jsStream = fs.createReadStream(path.join(process.cwd(), "/client/loader.js"));
        jsStream.pipe(response);
    }
}
requestHandlers.parsers = new Array();
exports.requestHandlers = requestHandlers;
//# sourceMappingURL=requestHandlers.js.map