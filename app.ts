// import { WishListParser } from './scripts/wishlistparser';
// var http = require("http");
// console.log('server started');
// http.createServer(onRequest).listen(8888);

// function onRequest(request, response) {
//   var parser = new WishListParser('76561198042827968');
//   parser.ParseWishList().then((result) => {
//     console.log(result.getResultMessage());
//     response.writeHead(200, { "Content-Type": "application/json" });
//     response.write(JSON.stringify(result.getSteamItems()));
//     response.end();
//   });
// }

import {WishListParserServer} from './scripts/server';
console.log('server starting');
WishListParserServer.start();

