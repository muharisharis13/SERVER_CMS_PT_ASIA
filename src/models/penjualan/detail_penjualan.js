const { db } = require('../../../database/database')
const sequalize = require('sequelize')


const detail_penjualan = db.define('detail_penjualan',{
  id_penjualan : {type:sequalize.STRING},
  id_produk :{type:sequalize.STRING},
  harga_produk :{type:sequalize.STRING},
  qty :{type:sequalize.STRING}
})


detail_penjualan.removeAttribute('id')

module.exports = detail_penjualan