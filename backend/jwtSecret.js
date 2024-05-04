const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// const jwtSecret = crypto.randomBytes(64).toString('hex');
const jwtSecret = "graceMarketing";

module.exports = jwtSecret;
