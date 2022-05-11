const sequalize = require('sequelize')
const {db} = require('../../../database/database')


const produk = db.define('produk',{
  id_produk : {type:sequalize.STRING, primaryKey:true},
  nama_produk: {type: sequalize.STRING, allowNulls : false},
  qty : {type: sequalize.STRING, allowNulls : false},
  harga_produk : {type : sequalize.STRING, allowNulls : false},
  satuan : {type: sequalize.STRING, allowNulls : false},
  deskripsi : {type: sequalize.STRING, allowNulls : true},
  image_produk : {type: sequalize.STRING, allowNulls : true},
})

produk.removeAttribute('id')

module.exports = produk