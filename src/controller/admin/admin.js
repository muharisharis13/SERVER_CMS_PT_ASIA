const crypto = require('crypto')
const { id } = require('../../../generator_id/generator_id')
const { Ok, Error } = require('../../../hasilResponse/hasilResponse')
const { createToken } = require('../../../token/token')
const { admin } = require('../../models/admin/admin')
const moment = require('moment')

exports.loginAdmin = async function(req, res){
  const {username, password} = req.body
  try {
    await admin.findAll({
      where : {
        username :username,
        password : crypto.createHash('md5').update(password).digest('hex')
      }
    })
    .then(hasil => {
      if(hasil.length > 0) {
        let data = {
          username : hasil[0].username,
          password : hasil[0].password
        }

        let token = createToken({result : data})

        res.status(200)
        res.json({
          status: 'success',
          data : {
            username : hasil[0].username,
            role : hasil[0].role
          },
          token : token
        })
      }
      else {
        res.status(200).json({
          status : 'error',
          message : 'Username Atau Password Salah',
          data : hasil
        })
      }
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      data: err
    })
  }
}



exports.registerAdmin = async function(req, res){
  const {username , password, role} = req.body

  try {
    await admin.create({
      id_user : `ADM${moment(new Date()).format('hhmmss')}`,
      username : username,
      password: crypto.createHash('md5').update(password).digest('hex'),
      role : role
    })
    .then(hasil => {
      res.status(200)
      res.json({
        status : Ok,
        data : {
          username : hasil.username,
          id_user : hasil.id_user,
          role : hasil.role
        }
      })
    })
  } catch (err) {
    res.status(500)
    res.json({
      status : Error,
      data : err
    })
  }
}