const { id } = require('../../../generator_id/generator_id')
const produk = require('../../models/produk/produk')
const moment = require('moment')


exports.getProduk = async function(req, res){
  try {

    await produk.findAll({where : {satuan :'DUS'}}).then(hasil => {
      res.json({
        message: 'success',
        data : hasil
      })
    })
    
  } catch (err) {
    res.status(500).json({
      message:'error',
      data : err
    })
  }
}
exports.getBahanBaku = async function(req, res){
  try {

    await produk.findAll().then(hasil => {
      res.json({
        message: 'success',
        data : hasil.filter(hasil => hasil.satuan !== 'DUS').map(item => ({
          id_produk: item.id_produk,
          nama_produk: item.nama_produk,
          qty: item.qty,
          harga_produk: item.harga_produk,
          satuan: item.satuan,
          deskripsi: item.deskripsi,
          image_produk: item.image_produk,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }))
      })
    })
    
  } catch (err) {
    res.status(500).json({
      message:'error',
      data : err
    })
  }
}

exports.editHarga = async function(req, res){
  const {id_produk} = req.params
  const {harga_produk} = req.body

  try {
    produk.findOne({where:{id_produk : id_produk}})
    .then(hasil =>{
      hasil.update({
        harga_produk : harga_produk
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
      message : 'error',
      data : err
    })
  }
}


exports.editProduk = async function(req, res){
  const {id_produk} = req.params
  const {nama_produk , qty, harga_produk, satuan} = req.body

  try {

    produk.findOne({where:{id_produk : id_produk}})
    .then(hasil =>{
      hasil.update({
        qty : JSON.stringify(parseInt(hasil.qty) + parseInt(qty)),
        harga_produk : harga_produk,
        satuan: satuan
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
      message : 'error',
      data : err
    })
  }
}

exports.addProduk = async function(req, res){
  const {nama_produk, qty, deskripsi, satuan} = req.body
  const id_ = moment(new Date()).format('YYYYMMDDhhmmss')
  try {
    if(req.file){
      // res.json(req.file)
      await produk.create({
        id_produk : `PROD${id_}`,
        nama_produk : nama_produk,
        qty: 0,
        harga_produk : 0,
        satuan : satuan,
        deskripsi :deskripsi,
        image_produk : `http://localhost:1234/uploads/produk/${req.file.filename}`
      })
      .then(hasil => {
        res.status(200).json({
          message : 'success',
          data : hasil
        })
      })

    }
    else{
      await produk.create({
        id_produk : `PROD${id_}`,
        nama_produk : nama_produk,
        qty: 0,
        harga_produk : 0,
        satuan : satuan,
      })
      .then(hasil => {
        res.status(200).json({
          message : 'success tanpa image',
          data : hasil
        })
      })
    }
    
  } catch (err) {
    res.status(500).json({
      message : 'error',
      data : err
    })
  }
}