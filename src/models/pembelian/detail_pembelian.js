const sequalize = require('sequelize')
const { db } = require('../../../database/database')


const detail_pembelian = db.define('detail_pembelian',{
  id_pembelian : {type:sequalize.STRING},
  id_produk : {type:sequalize.STRING},
  qty : {type:sequalize.STRING},
  ppn : {type:sequalize.STRING},
  harga_produk : {type:sequalize.STRING}
})

detail_pembelian.removeAttribute('id')

module.exports = detail_pembelian