import fs = require('fs');
import path = require('path');
import { WishListParser } from './wishlistparser';

export class requestHandlers {

    private static parsers: Array<WishListParser> = new Array();

    static root(response: any) {
        response.writeHead(200, { "Content-Type": "text/html" });
        let indexStream = fs.createReadStream(path.join(process.cwd(), '/client/index.html'));
        indexStream.pipe(response);
    }

    static parse(response: any, postData: any) {
        //console.log("Request handler 'parse' was called.");
        //проверить таску в коллекции
        let data = JSON.parse(postData);
        let already: WishListParser;
        if (requestHandlers.parsers !== undefined && requestHandlers.parsers.length > 0) {
            already = requestHandlers.parsers.find(myObj => myObj.Token == data.token);
        }
        if (already === undefined) {
            already = new WishListParser(data.id, data.token);
            already.ParseWishList();
            requestHandlers.parsers.push(already);
        }
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(already.Result));
        response.end();
    }

    static js(response: any) {
        response.writeHead(200, { "Content-Type": "text/javascript" });
        let jsStream = fs.createReadStream(path.join(process.cwd(), "/client/loader.js"));
        jsStream.pipe(response);
    }

}