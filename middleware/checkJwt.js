var jwt = require('express-jwt')
var jwksRsa = require('jwks-rsa')

const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-w78xv6-p.us.auth0.com/.well-known/jwks.json'
    }),
    
    // Validate the audience and the issuer
    audience: 'https://lizzieserver.herokuapp.com/', //used to say 'http://localhost:8000', //replace with your API's audience, available at Dashboard > APIs
    issuer: 'https://dev-w78xv6-p.us.auth0.com/',
    algorithms: [ 'RS256' ]
  });
module.exports = checkJwt