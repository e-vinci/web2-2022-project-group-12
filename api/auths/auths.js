const jwt = require('jsonwebtoken');

const jwtSecret = 'ilovemypizza!';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h



async function login(email) {
  console.log("/login l'email est ", email);
  const token = jwt.sign(
    { email }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    email,
    token,
  };

  return authenticatedUser;
}




module.exports = {
  login,
};