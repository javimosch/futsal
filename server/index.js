import "regenerator-runtime/runtime";
const express = require('express');
const app = express();
const path = require('path');
import configureRoutes from './routes';
import runWebpack from './webpack';

(async() => {

  configureRoutes(app);

  if (process.env.NODE_ENV === 'development') {
    runWebpack(app);
  }

  const PORT = process.env.PORT || 8080;
  app.listen(PORT, function() {
    console.log('Server up at ', `https://0.0.0.0:${PORT}`);
  });

})().catch(err => {
  console.log(err.stack);
  process.exit(1);
});
