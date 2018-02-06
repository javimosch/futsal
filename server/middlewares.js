const cors = require('cors');
const bodyParser = require('body-parser');

export default function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
}
