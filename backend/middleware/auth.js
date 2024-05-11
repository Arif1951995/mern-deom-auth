const jwt = require('jsonwebtoken');


   function  generateToken(user) {
     const token =  jwt.sign({name: user.name, email: user.email}, process.env.JWT_SECRET);
    return token
  }

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1];
    console.log("token", token);
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log("err", err)
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }


  module.exports = {generateToken, authenticateToken}