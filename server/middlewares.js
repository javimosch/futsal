const cors = require('cors');
const bodyParser = require('body-parser');
var morgan = require('morgan')
var isProduction = require('./config').isProduction;

export default function(app) {
    app.use(morgan(isProduction?'tiny':'dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
}
