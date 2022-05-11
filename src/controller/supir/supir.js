const supirModels = require('../../models/supir/supir')
const moment = require('moment')

exports.getSupirController = async function(req, res){
  try {
    let data = await supirModels.findAll()

    res.json({
      message:'success',
      data:data
    })
  } catch (err) {
    res.json({
      message:"error",
      data:err
    })
  }
}

exports.addSupir = async function(req, res){
  const {nama_supir,alamat_supir,no_telepon} = req.body
  try {

    await supirModels.create({
      id_supir: `SUPIR${moment(new Date()).format('YYYYMMDDhhmmss')}`,
      nama_supir: nama_supir,
      no_telepon:no_telepon,
      alamat_supir: alamat_supir
    }).then(result=>{
      res.json({
        message:'success',
        data : result
      })
    })

    // res.json({
    //   message:'success',
    //   data : req.body
    // })
    
  } catch (err) {
    res.json({
      message:'error',
      data:err
    })
  }
}