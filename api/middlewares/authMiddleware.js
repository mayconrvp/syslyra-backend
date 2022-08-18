const jwt = require('jsonwebtoken');
const config = require('../config/jwt-config')
const { promisify } = require('util');

module.exports = async(req, res, next) => {

  const auth = req.headers.authorization;
  if(!auth){
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Token inexistente"
    })
  }

  const [bearer, token] = auth.split(' ');

  try{
    const decoded = await promisify(jwt.verify)(token, config.secret);
    if(!decoded){
      return res.status(401).json({
        error: true,
        code: 130,
        message: "Token está expirado"
      })
    }else{
      req.id = decoded.id;
      next()
    }
  }catch(err){
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Token está inválido"
    })
  }

}