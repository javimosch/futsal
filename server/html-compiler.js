const sander = require('sander');
const path = require('path');
const Handlebars = require('handlebars');
const cordovaContext = require('../config/cordova.context');
module.exports = {
    compileIndexForDevelopment: async function(context) {
        let html = await sander.readFile(path.join(process.cwd(), '/index.html'));
        html = html.toString('utf-8').replace('<!--vue-app-outlet-->', '<div id="app"></div>');
        return Handlebars.compile(html)(context);
    },
    compileIndexForCordova: async function() {
        return this.compileIndexForDevelopment(cordovaContext)
    },
    writeIndexForCordova: async function () {
        let html = await this.compileIndexForCordova();
        await sander.writeFile(path.join(process.cwd(),'www/index.html'), html);
    }
};
