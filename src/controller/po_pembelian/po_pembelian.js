const header_po_pembelian = require('../../models/po_pembelian/header_po_pembelian')
const detail_po_pembelian = require('../../models/po_pembelian/detail_po_pembelian')
const { id } = require('../../../generator_id/generator_id')
const produk = require('../../models/produk/produk')
const moment = require('moment')
const {Op} = require('sequelize')

exports.getPoPembelian = async function(req, res){
  const {start, limit, end, status} = req.query
  try {

    let header = await header_po_pembelian.findAll(
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
    let detail = await detail_po_pembelian.findAll()
    let produk1 = await produk.findAll()

    let data = header.map(item=>({
      id_po_pembelian : item.id_po_pembelian,
      keterangan : item.keterangan,
      status : item.status,
      createdAt : item.createdAt,
      detail_po : detail.filter(id => id.id_po_pembelian === item.id_po_pembelian).map(detail =>({
        qty : detail.qty,
        id_produk : produk1.filter(idp => idp.id_produk === detail.id_produk)[0].id_produk,
        nama_produk : produk1.filter(idp => idp.id_produk === detail.id_produk)[0].nama_produk,
        satuan : produk1.filter(idp => idp.id_produk === detail.id_produk)[0].satuan,
      }))
    }))

    res.json({
      message : 'success',
      data: data,
    })
    
    
  } catch (err) {
    res.json({
      message: 'error',
      data : err
    })
  }
}

exports.changeStatus = async function(req, res){
  const {id_po_pembelian} = req.params
  const {status} = req.body

  try {
    // res.json(status)
    await header_po_pembelian.findOne({where : {id_po_pembelian : id_po_pembelian}})
    .then(hasil => {
      hasil.update({
        status:status
      })

      res.json({
        message:'success',
        data : hasil
      })
    })
    
  } catch (err) {
    res.json({
      message : 'error',
      data : err
    })
  }
}

exports.addPoPembelian = async function(req, res){
  const {list_produk,keterangan} = req.body
  let id2= `POPEM${parseInt(id) * parseInt(moment(new Date()).format('YYYYdddMMMMhhss'))}`
  try {
    let header = await header_po_pembelian.create({
      id_po_pembelian : id2,
      keterangan : keterangan,
      status: 'onProcess'
    })

    let detail = []
    list_produk.map(async (item)=>{
     detail.push(await detail_po_pembelian.create({
        id_po_pembelian : id2,
        id_produk : item.id_produk,
        qty: parseInt(item.qty)
      }))
    })
    
    res.json({
      message: 'success',
      data: header,
      data2: detail
    })

  } catch (err) {
    res.json({
      message : 'error',
      data:err
    })
  }
}