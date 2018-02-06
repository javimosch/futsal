const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
import { AUTH0_AUDIENCE } from './config';
import axios from 'axios';

export var authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://misitioba.eu.auth0.com/.well-known/jwks.json"
  }),
  // This is the identifier we set when we created the API
  audience: AUTH0_AUDIENCE,
  issuer: "https://misitioba.eu.auth0.com/",
  algorithms: ['RS256'],
});

const jwtAuthz = require('express-jwt-authz');

export var authScopes = jwtAuthz;

export function fetchUser(req, res, next) {
  let access_token = null;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    access_token = req.headers.authorization.split(' ')[1];
  }
  else if (req.query && req.query.token) {
    access_token = req.query.token;
  }

  (async() => {
    if (access_token) {
      let details = (await axios.get(`https://misitioba.eu.auth0.com/userinfo`, { headers: { Authorization: `Bearer ${access_token}` } })).data;
      console.log('DETAILS', details);
    }
    else {
      console.log('WARN: no access_token')
    }
    next();
  })().catch(next);

}
