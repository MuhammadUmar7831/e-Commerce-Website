const jwt = require('jsonwebtoken');
const jwtSecret = require('crypto').randomBytes(64).toString('hex');
console.log(jwtSecret);
module.exports = jwtSecret;
