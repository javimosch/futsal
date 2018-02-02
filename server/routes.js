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

    app.get('*', async function(request, response) {

        response.writeHead(200, { 'Content-Type': 'text/html' });
        
        html = html.toString('utf-8').replace('<!--vue-app-outlet-->','<div id="app"></div>');
        
        response.write(Handlebars.compile(html)({
            title: 'DEV',
            meta: `
        <meta description="vuejs server side render">
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
            //context to use as data source
            //in the template for interpolation
            let context = {
                title: req.url.substring(req.url.lastIndexOf('/')),
                meta: `
        <meta description="vuejs server side render">
      `
            };
            
            context = Object.assign({
            }, routesContext.default);
            
            let currentRoute = req.url.substring(req.url.lastIndexOf('/'));
            context = Object.assign(context, routesContext[currentRoute]||{});

            renderer.renderToString(app, context, function(err, html) {
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
    }else{
        await addVueServerRendering(app);    
    }
}
