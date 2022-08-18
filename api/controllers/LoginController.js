const User = require('./UsuarioController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/jwt-config')

class LoginController {

  async index(req, res){
    const { login, senha } = req.body;

    const userExist = await User.listarUsuarioPorLogin({login})

    if(!userExist){
      return res.status(400).json({
        error: true,
        message: 'Usuário não localizado'
      })
    }
    if(!(await bcrypt.compare(senha, userExist.senha))) {
      return res.status(400).json({
        error: true,
        message: "A senha está inválida!"
      })
    }

    return res.status(200).json({
      // user: {
      //   id: userExist.id,
      //   login: userExist.login,
      // },
      token: jwt.sign(
        {id: userExist.id}, 
        config.secret, 
        {expiresIn: config.expireIn}
      )
    })
  }
}

module.exports = new LoginController();