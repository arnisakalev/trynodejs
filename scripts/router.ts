import fs = require('fs');
import path = require('path');

export class Router {
    static Route(pathname: string, handle: any, response: any, postData: any) {
        console.log('About to route a request for ' + pathname);
        if (typeof handle[pathname] === 'function') {
            return handle[pathname](response, postData);
        } else {
            console.log("No request handler found for " + pathname);
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not found");
            response.end();
        }
        // if (pathname.indexOf('.js', 0) > -1) {
        //     return handle['/file'](response, pathname);
        // } else {
        //     console.log('About to route a request for ' + pathname);
        //     if (typeof handle[pathname] === 'function') {
        //         return handle[pathname](response, postData);
        //     } else {
        //         console.log("No request handler found for " + pathname);
        //         response.writeHead(404, { "Content-Type": "text/plain" });
        //         response.write("404 Not found");
        //         response.end();
        //     }
        // }

        // console.log('About to route a request for ' + pathname);
        // if (typeof handle[pathname] === 'function') {
        //     return handle[pathname](response, postData);
        // } else {
        //     console.log("No request handler found for " + pathname);
        //     response.writeHead(404, { "Content-Type": "text/plain" });
        //     response.write("404 Not found");
        //     response.end();
        // }
    }
}