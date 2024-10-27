const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Access the authorization header as a property, not as a function
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token

  // No token, respond with Unauthorized
  if (!token) return res.sendStatus(401);

  // Verify the token using the secret
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, respond with Forbidden
    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  });
}

module.exports = {
  authenticateToken,
};

/* const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    const authHeader = req.headers("authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}

module.exports = {
    authenticateToken,
} */
