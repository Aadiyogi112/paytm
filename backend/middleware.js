const JWT_SECRET = require("./config.js");
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authheader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

module.exports = { authMiddleware };

/**
 
const authheader=req.headers.authorization
if(!authheader || !authheader.startsWith("Bearer ")){
    return res.status(403).json({message:"No token provided"})
}

const token=authheader.split(" ")[1]

try{
const decoded=jwt.verify(token,process.env.JWT_SECRET)
req.userId=decoded.userId
next()
}cathch(err){
    return res.status(403).json({message:"Invalid token"})
}
  
 */
