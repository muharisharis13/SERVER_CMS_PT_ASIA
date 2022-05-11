const jwt = require('jsonwebtoken')


const jwt_key = 'asiatirtamakmur'

exports.checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, jwt_key)
    res.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).json({message: err})
  }
}

exports.createToken = ({result}) => {
  return jwt.sign(result, jwt_key)
}