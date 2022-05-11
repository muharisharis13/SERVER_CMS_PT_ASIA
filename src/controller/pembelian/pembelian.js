const { id } = require('../../../generator_id/generator_id')
const produk = require('../../models/produk/produk')
const moment = require('moment')
const header_pembelian = require('../../models/pembelian/header_pembelian')
const detail_pembelian = require('../../models/pembelian/detail_pembelian')
const supplier = require('../../models/supplier/supplier')
const {Op} = require('sequelize')

exports.uploadBuktiBayarPembelian = async function(req, res){
const {id_pembelian} = req.params

try {
  if(req.file){
    let data = await header_pembelian.findOne({where : {id_pembelian : id_pembelian}})
    .then(hasil => {
      hasil.update({
        bukti_bayar_pembelian : `http://localhost:1234/uploads/bukti_bayar_pembelian/${req.file.filename}`,
        status : 'lunas'
      })
    })
    res.json({
      message: 'success',
      data : data
    })
  }
  else{
    res.json({
      message : 'no file in uploads'
    })
  }
  
} catch (err) {
  res.json({
    message : 'error',
    data : err
  })
}
}

exports.getPembelian = async function(req, res){
  const{start, end, limit,status} = req.query
  try {
    let header = await header_pembelian.findAll(
      start && end ?
      {where : {
        createdAt : {
          [Op.between] : [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
        },
        status: status
      },
      limit : limit ? parseInt(limit) : 10
    }
    :{ limit:limit ? parseInt(limit) : 10}
    )
    let detail = await detail_pembelian.findAll()
    let arrProduk = await produk.findAll()
    let arrSupplier = await supplier.findAll()

    let data = header.map(item => ({
      id_pembelian : item.id_pembelian,
      data_supplier : {
        id_supplier : arrSupplier.filter(sup => sup.id_supplier ===item.id_supplier)[0].id_supplier,
        nama_supplier : arrSupplier.filter(sup => sup.id_supplier ===item.id_supplier)[0].nama_supplier,
        alamat_supplier : arrSupplier.filter(sup => sup.id_supplier ===item.id_supplier)[0].alamat_supplier,
        no_telepon_supplier : arrSupplier.filter(sup => sup.id_supplier ===item.id_supplier)[0].no_telepon_supplier,

      },
      tanggal_jatuh_tempo :item.tanggal_jatuh_tempo,
      status : item.status,
      bukti_faktur_pembelian : item.bukti_faktur_pembelian,
      bukti_bayar_pembelian : item.bukti_bayar_pembelian,
      total : item.total,
      createdAt : item.createdAt,
      list_produk : detail.filter(id=>id.id_pembelian === item.id_pembelian).map(list_produk=>({
        id_produk : list_produk.id_produk,
        nama_produk : arrProduk.filter(arrProduk => arrProduk.id_produk === list_produk.id_produk)[0].nama_produk,
        qty : list_produk.qty,
        ppn : list_produk.ppn,
        harga_produk: list_produk.harga_produk
      }))
    }))
    res.json({
      message : 'success',
      data : data
    })
    
  } catch (err) {
    res.json({
      message : 'error',
      data : err
    })
  }
}

exports.addPembelian = async function(req, res){
  const {id_supplier, tanggal_jatuh_tempo,total, id_produk, qty, harga_produk, ppn, list_produk} = req.body
  let id_pembelian = `PEMB${ parseInt(moment(new Date()).format('YYYYMMDDhhmmss'))}`

  try {

    // res.json({
    //   data : JSON.parse(list_produk),
    //   file : req.file.filename
    // })
   
    if(req.file){

      let data1 = await header_pembelian.create({
        id_pembelian : id_pembelian,
        id_supplier : id_supplier,
        tanggal_jatuh_tempo: new Date(moment(tanggal_jatuh_tempo).format('YYYY-MM-DD, hh:mm:ss')),
        status : 'belum lunas',
        bukti_faktur_pembelian : `http://localhost:1234/uploads/bukti_faktur_pembelian/${req.file.filename}`,
        bukti_bayar_pembelian : '',
        total : total
      })
  
      let arrProduk =  JSON.parse(list_produk)
      
      arrProduk.map(async (item)=>{
        await detail_pembelian.create({
          id_pembelian : id_pembelian,
          id_produk : item.id_produk,
          qty : item.qty,
          ppn : item.ppn,
          harga_produk : item.harga_Produk
        })
  
        await produk.findOne({where : {id_produk : item.id_produk }})
        .then(produk1 => {
          produk1.update({
            qty : JSON.stringify(parseInt(produk1.qty) + parseInt(item.qty))
          })
        })
      })
  
      res.json({
        message: 'success',
        data:data1
      })
    }
    else{
     
      res.json({
        message: 'error',
        data:'no file here'
      })
    }

    
  } catch (err) {
    res.json({
      message : 'error',
      data: err
    })
  }
}