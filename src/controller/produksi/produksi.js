const { id } = require('../../../generator_id/generator_id')
const header_produksi = require('../../models/produksi/header_produksi')
const details_produksi = require('../../models/produksi/detail_produksi')
const produk = require('../../models/produk/produk')
const moment = require('moment')
const {Op} = require('sequelize')

exports.gethasilProduksi = async function(req, res){
  const {start, limit, end, id_produk} = req.query
  try {
    let detail = await details_produksi.findAll(
      start && end ?
      {where : {
        createdAt : {
          [Op.between] : [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
        },
        id_produk : id_produk ? id_produk : null
      },
      limit : limit ? parseInt(limit) : 10
    }
    :{ limit:limit ? parseInt(limit) : 10}
    )
    let produk1 = await produk.findAll()

    let data = detail.map(item => ({
      id_produksi : item.id_produksi,
      id_produk : produk1.filter(id => id.id_produk === item.id_produk)[0].id_produk,
      nama_produk : produk1.filter(id => id.id_produk === item.id_produk)[0].nama_produk,
      qty :item.qty,
      createdAt : item.createdAt
    }))
    res.json({
      message:'success',
      data : data,
      total:detail.reduce((sum, { qty }) => parseInt(sum) + parseInt(qty), 0)
    })
    
  } catch (err) {
    res.json({
      message: 'error',
      data: err
    })
  }
}

exports.addProduksi = async function(req, res){
  const {id_produk, qty, list_produk} =req.body

  const id_ = moment(new Date()).format('YYYYMMDDhhmmss')

  try {

    let data = await header_produksi.create({
      id_produksi : `PRODUKSI${id_}`,
    })
    
    
    list_produk.map(async item=>{
      await details_produksi.create({
        id_produksi:`PRODUKSI${id_}`,
        id_produk : item.id_produk,
        qty : item.qty
        
      })
      await produk.findOne({where : {id_produk : item.id_produk}})
      .then(hasil=>{
        hasil.update({
          qty : JSON.stringify(parseInt(hasil.qty) + parseInt(item.qty))
        })
      })
    })

    res.json({
      message:'success',
      data: data
    })
    
  } catch (err) {
    res.json({
      message:'error',
      data: err
    })
  }
}