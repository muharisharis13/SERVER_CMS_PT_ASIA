const header_po_penjualan = require('../../models/po_penjualan/header_po_penjualan')
const detail_po_penjualan = require('../../models/po_penjualan/detail_po_penjualan')
const produk = require('../../models/produk/produk')
const pelanggan = require('../../models/pelanggan/pelanggan')
const { id, idMath } = require('../../../generator_id/generator_id')
const moment = require('moment')
const{Op} = require('sequelize')


exports.sendReject = async function(req, res){
  const {id_po_penjualan} = req.params
  const {reason} = req.body

  try {
    await header_po_penjualan.findOne({where: {id_po_penjualan : id_po_penjualan}}).then(hasil => {
      hasil.update({
        reason : reason,
        status: 'cancel'
      })
      .then(reason => {
        res.status(200).json({
          message: 'success',
          data: reason
        })
      })
    })
    
  } catch (err) {
    res.json({
      message:'error',
      data: err
    })
  }
}


exports.getPoPenjualan = async function(req, res){
  const {id_pelanggan} = req.params
  const {start, limit, end,status='pending'} = req.query
  try {
    let detail2 =[]
    let header 
    let id_po_penjualan =[]
    let produklist
    let pelangganlist


    if(id_pelanggan){
      await header_po_penjualan.findAll(
        start && end ?
        {where: {id_pelanggan : id_pelanggan, 
        createdAt : {
          [Op.between] : [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
        },
        status: status
      },limit : limit ? parseInt(limit) : 10 , order: [['createdAt', 'DESC']]
    } : { where:{id_pelanggan : id_pelanggan, status: status},limit:limit ? parseInt(limit) : 10, order: [['createdAt', 'DESC']]}
      )
      .then(hasil => {
        header = hasil
        hasil.map(item=> id_po_penjualan.push(item.id_po_penjualan))
      })
      
      detail2 = await detail_po_penjualan.findAll()
      produklist = await produk.findAll()
      pelangganlist = await pelanggan.findAll()
        
        
        
        res.status(200).json({
          message: 'success',
          data: header.map(item=>({
            reason : item.reason,
            status : item.status,
            createdAt: item.createdAt,
            id_po_penjualan : item.id_po_penjualan,
            detail_pelanggan:{
              id_pelanggan : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].id_pelanggan,
              nama_pelanggan : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].nama_pelanggan,
              alamat_pelanggan : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].alamat_pelanggan,
              no_telepon : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].no_telepon,
            },
            total : item.total,
            detail_produk : detail2.filter(id => id.id_po_penjualan === item.id_po_penjualan).map(item=>({
              id_produk : produklist.filter(id=> id.id_produk === item.id_produk)[0].id_produk,
              nama_produk : produklist.filter(id=> id.id_produk === item.id_produk)[0].nama_produk,
              qty :item.qty,
              harga_produk : item.harga_produk
            }))
          }))
        })
        
      }
      else{
      await header_po_penjualan.findAll(
        start && end ?
        {where : {
          createdAt : {
            [Op.between] : [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
          },
          status:status
        },
        limit : limit ? parseInt(limit) : 10, order: [['createdAt', 'DESC']]
      }
      :status ?
      { where : {status : status},limit:limit ? parseInt(limit) : 10, order: [['createdAt', 'DESC']]}
      :{ limit:limit ? parseInt(limit) : 10, order: [['createdAt', 'DESC']]}
      )
      .then(hasil => {
        header = hasil
        hasil.map(item=> id_po_penjualan.push(item.id_po_penjualan))
      })
      
      detail2 = await detail_po_penjualan.findAll()
      produklist = await produk.findAll()
      pelangganlist = await pelanggan.findAll()
        
        
        
        res.status(200).json({
          message: 'success',
          data: header.map(item=>({
            status: item.status,
            createdAt: item.createdAt,
            id_po_penjualan : item.id_po_penjualan,
            detail_pelanggan:{
              id_pelanggan : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].id_pelanggan,
              nama_pelanggan : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].nama_pelanggan,
              alamat_pelanggan : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].alamat_pelanggan,
              no_telepon : pelangganlist.filter(id => id.id_pelanggan === item.id_pelanggan)[0].no_telepon,
            },
            total : item.total,
            detail_produk : detail2.filter(id => id.id_po_penjualan === item.id_po_penjualan).map(item=>({
              id_produk : produklist.filter(id=> id.id_produk === item.id_produk)[0].id_produk,
              nama_produk : produklist.filter(id=> id.id_produk === item.id_produk)[0].nama_produk,
              qty :item.qty,
              harga_produk : item.harga_produk
            }))
          })),
          total: header.reduce((sum, { total }) => parseInt(sum) + parseInt(total), 0)
        })

    }
  } catch (err) {
    res.status(500).json({
      message : 'error',
      data :[]
    })
  }
}

exports.addPoPenjualan = async function(req, res){
  const {id_pelanggan, id_produk, nama_produk, qty , harga_produk, satuan, list_produk, total } = req.body

  try {
    
    let id2  = `POPEN${idMath *total}`

    let data1
    let data2
    
    data1=await header_po_penjualan.create({
     id_po_penjualan :id2,
     id_pelanggan : id_pelanggan,
     total : total,
     status : 'pending'
   })
    
      list_produk.map( async(item)=>{
      data2 = await detail_po_penjualan.create({
          
         id_po_penjualan : id2,
         id_produk : item.id_produk,
         qty : item.qty,
         harga_produk : item.harga_produk,
         satuan : item.satuan
         
         
         })
        })
        
        res.status(200).json({
          messagge : 'success',
          header : data1,
          detail: data2
        })
    
      
    

  

  } catch (err) {
    res.status(500).json({
      message: 'error',
      data : err
    })
  }
}