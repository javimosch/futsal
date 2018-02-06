const express = require('express');
var requireAgain = require('require-again')
const fs = require('fs');
const path = require('path');
import Handlebars from 'handlebars';
import * as sander from 'sander';
import routesContext from './vue-routes-context';
const isProduction = process.env.NODE_ENV === 'development';



export async function addHTML5RedirectMode(app) {

    let html = await sander.readFile(path.join(process.cwd(), '/index.html'));

    app.get('*', async function(request, response, next) {

        var ignore = ['/api/', '.js', '.css', '.jpg', '_hmr','.json'];

        for (var x = 0; x < ignore.length; x++) {
            if (request.url.indexOf(ignore[x]) !== -1) return next('route');
        }

        response.writeHead(200, { 'Content-Type': 'text/html' });

        html = html.toString('utf-8').replace('<!--vue-app-outlet-->', '<div id="app"></div>');

        response.write(Handlebars.compile(html)({
            title: 'DEV',
            meta: `
        
      `
        }));
        response.end();
    });
}

export async function addVueServerRendering(server) {
    // get renderer from vue server renderer
    const renderer = require('vue-server-renderer').createRenderer({
        // set template
        template: fs.readFileSync('./index.html', 'utf-8')
    });

    server.use('/dist', express.static(path.join(process.cwd(), 'dist')));

    server.get('*', (req, res) => {

        const bundle = requireAgain('../dist/server.bundle.js');

        bundle.default({ url: req.url }).then((app) => {


            let context = Object.assign({}, routesContext.default);

            let currentRoute = req.url.substring(req.url.lastIndexOf('/'));
            let routeContext = routesContext[currentRoute] || {};
            Object.keys(context).forEach(key => {
                if (typeof context[key] === 'string') {
                    routeContext[key] = context[key] + routeContext[key];
                }
            });


            renderer.renderToString(app, routeContext, function(err, html) {
                if (err) {
                    if (err.code === 404) {
                        res.status(404).end('Page not found')
                    }
                    else {
                        res.status(500).end('Internal Server Error')
                    }
                }
                else {
                    res.end(html)
                }
            });
        }, (err) => {
            console.log(err);
        });
    });
}

export default async function(app) {

    app.use('/static', express.static(path.join(process.cwd(), 'static')));

    if (process.env.NODE_ENV === 'development') {
        await addHTML5RedirectMode(app);
    }
    else {
        await addVueServerRendering(app);
    }

    let apiFiles = await sander.readdir(path.join(process.cwd(), 'server/api'));

    apiFiles.forEach(file => {
        let req = require(path.join(process.cwd(), 'server/api', file));
        req.default(app);
    });

}
