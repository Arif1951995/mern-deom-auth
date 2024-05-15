const jwt = require('jsonwebtoken');


   async function  generateToken(user) {
    console.log("generateoken")
    console.log({user})
     const token =  await jwt.sign({name: user.name, id: user._id}, process.env.JWT_SECRET);
    if(!token) throw new Error("Error in jwt token generation")
    return token
  }

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1];
    console.log("token", token);
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      console.log("err", err);
      console.log("user", user);

      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }


  module.exports = {generateToken, authenticateToken}