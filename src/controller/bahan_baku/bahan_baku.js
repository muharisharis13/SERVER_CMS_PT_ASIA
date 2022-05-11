const {id} = require('../../../generator_id/generator_id')
const header_bahan_baku = require('../../models/bahan_baku/header_bahan_baku')
const detail_bahan_baku = require('../../models/bahan_baku/detail_bahan_baku')
const produk = require('../../models/produk/produk')
const moment =require('moment')
const {Op} = require('sequelize')

exports.getBahanBaku = async function(req, res){
  const {start, end, limit, id_produk} = req.query
  try {
   let bahan_baku = await detail_bahan_baku.findAll(
     start && end ?
     {
       where:{
         createdAt :{
          [Op.between] : [moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD')]
         },
         id_produk : id_produk 
       }, limit : limit ? parseInt(limit) : 10
     }
     :{ limit:limit ? parseInt(limit) : 10}
   )
   let produk1 = await produk.findAll()

    let data = bahan_baku.map(item =>( {
      id_bahan_baku : item.id_bahan_baku,
      id_produk : item.id_produk,
      nama_produk : produk1.filter(produk => produk.id_produk === item.id_produk)[0].nama_produk,
      qty : item.qty,
      createdAt: item.createdAt
    }))

    res.json({
      message:'success',
      data : data
    })


  } catch (err) {
    res.json({
      message:'error',
      data: err
    })
  }
}

exports.addBahanBaku = async function(req, res){
  const {list_produk} = req.body

  const id_  = moment(new Date()).format('YYYYMMDDhhmmss')
  try {

    let data = await header_bahan_baku.create({
      id_bahan_baku: `BHNBKU${id_}`
    })

    list_produk.map(async item =>{
      await detail_bahan_baku.create({
        id_bahan_baku : `BHNBKU${id_}`,
        id_produk : item.id_produk,
        qty : item.qty
      })

       await produk.findOne({where : {id_produk: item.id_produk}})
      .then(hasil =>{
        hasil.update({
          qty : JSON.stringify(parseInt(hasil.qty)-parseInt(item.qty))
        })
      })

      
    } )
    res.json({
      message:'success',
      data : data
    })
  } catch (err) {
    res.json({
      message : err,
      data: err
    })
  }
}