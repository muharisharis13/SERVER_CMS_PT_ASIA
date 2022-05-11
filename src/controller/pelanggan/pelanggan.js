const { id } = require('../../../generator_id/generator_id')
const pelanggan = require('../../models/pelanggan/pelanggan')
const crypto = require('crypto')
const {createToken} = require('../../../token/token')
const {Op}  = require('sequelize')
const moment = require('moment')

exports.otp = async function(req, res){
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
  try {

    res.json({
      message:'success',
      data:makeid(5)
    })
    
  } catch (err) {
    res.json({
      message:'error',
      data:err
    })
  }
}

exports.changePassword = async function(req,res){
  const {no_telepon, password} = req.body

  try {
    let data
    await pelanggan.findOne({where : {no_telepon : no_telepon}}).then(hasil => {
       data = hasil.update({
        password : crypto.createHash('md5').update(password).digest('hex')
      })
      // res.json({
      //   message: 'success',
      //   data: hasil
      // })
    })

    res.json({
      message: 'success',
      data: 'berhasil change password'
    })
  } catch (err) {
    res.json({
      message :'error',
      data: err
    })
  }
}

exports.noTelepon = async function(req,res){
  const {no_telepon} = req.body
  try {
    await pelanggan.findOne({where : {no_telepon : no_telepon}})
    .then(hasil => {
      res.status(200).json({
        message : 'success',
        data : {
          no_telepon : hasil.no_telepon,
          nama_pelanggan:hasil.nama_pelanggan,
          alamat_pelanggan:hasil.alamat_pelanggan,
          no_telepon:hasil.no_telepon
        }
      })
    })


} catch (err) {
  res.json({
    message:'error',
    data : err
  })
}
}


exports.getPelanggan = async function(req, res){
  const {search, start, end, limit} = req.query
  
  try {
    await pelanggan.findAll(
      start && end && search ?
      {where : {
        createdAt : {
          [Op.between] : [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
        },
        nama_pelanggan : {
          [Op.like] : `%${search}%`
        }
      },
      limit : limit ? parseInt(limit) : 10
    }
      : start && end ? 
      {where : {
        createdAt : {
          [Op.between] : [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
        }
      },
      limit : limit ? parseInt(limit) : 10
    }
     :search ?
     {
       where : {
         nama_pelanggan : {
           [Op.like] : `%${search}%`
         }
       }
    }
    :{ limit:limit ? parseInt(limit) : 10}
     

    )
    .then(hasil => {
      res.status(200).json({
        message : 'success',
        data : hasil
      })
    })



  } catch (err) {
    res.json({
      message:'error',
      data : err
    })
  }
}

exports.deletePelanggan = async function(req, res){
   const {id_pelanggan} = req.params

   try {

    await pelanggan.destroy({where:{id_pelanggan : id_pelanggan}})
    .then(hasil => {
      res.status(200).json({
        message : 'success',
        data : hasil
      })
    })
     
   } catch (err) {
     res.status(500).json({
       message : 'error',
       data : err
     })
   }
}

exports.editPelanggan = async function(req, res){
  const {id_pelanggan} = req.params
  const {nama_pelanggan, alamat_pelanggan, no_telepon} = req.body

  try {
    await pelanggan.findOne({where: {id_pelanggan: id_pelanggan}})
    .then(hasil => {
      hasil.update({
        nama_pelanggan : nama_pelanggan,
        alamat_pelanggan : alamat_pelanggan,
        no_telepon : no_telepon
      })
      .then(hasil1 =>{
        res.status(200).json({
          message : 'success',
          data : hasil1
        })
      })
    })
  } catch (err) {
    res.status(500).json({
      message:'error',
      data : err
    })
  }
}

exports.loginPelanggan = async function(req, res){
  const {no_telepon, password} = req.body
  try {
    await pelanggan.findAll({
      where : {
        no_telepon :no_telepon,
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
            id_pelanggan : hasil[0].id_pelanggan,
            nama_pelanggan : hasil[0].nama_pelanggan,
            alamat_pelanggan : hasil[0].alamat_pelanggan,
            no_telepon : hasil[0].no_telepon
          },
          token : token
        })
      }
      else {
        res.status(200).json({
          status : 'error',
          message : 'No Telepon Atau Password Salah',
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



exports.registerController = async function(req, res){
  const {nama_pelanggan, alamat_pelanggan, no_telepon,password} = req.body

  try {

   
    await pelanggan.create({
      nama_pelanggan : nama_pelanggan,
      alamat_pelanggan : alamat_pelanggan,
      no_telepon : no_telepon,
      password : crypto.createHash('md5').update(password).digest('hex'),
      id_pelanggan: `PEL${moment(new Date()).format('YYYYMMDDhhmmss')}`
    })
    .then(result => {
      res.status(200)
      res.json({
        status : 'success',
        data : {
          id_pelanggan : result.id_pelanggan,
          nama_pelanggan : result.nama_pelanggan,
          alamat_pelanggan : result.alamat_pelanggan,
          no_telepon : result.no_telepon,
          createdAt : result.createdAt,
          updatedAt : result.updatedAt,
        }
      })
    })
  } catch (err) {
    res.json({
      status : 'error',
      data : err
    })
  }
}