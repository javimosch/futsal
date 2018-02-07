var path = require('path');
let isProduction = process.env.NODE_ENV === 'development';

export default function(app) {
    var webpack = require('webpack');
    
    var webpackConfig = require(path.join(process.cwd(),'build/webpack.dev.config'));
    var compiler = webpack(webpackConfig);

    if (!webpackConfig.output || !webpackConfig.output.publicPath) {
        throw Error('WEBPACK: publicPath required');
    }

    // Step 2: Attach the dev middleware to the compiler & the server
    app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true,
        //           publicPath: webpackConfig.output.publicPath
        publicPath: "/dist", // Do not end publicPath with a / 
        watchOptions: {
            poll: true
        },
        stats: {
            colors: true
        }
    }));

    // Step 3: Attach the hot middleware to the compiler & the server
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
}
