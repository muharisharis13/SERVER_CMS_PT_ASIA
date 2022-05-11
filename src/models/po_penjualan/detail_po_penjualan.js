const sequalize = require('sequelize')
const { db } = require('../../../database/database')


const detail_po_penjualan = db.define("detail_po_penjualan",{
  id_po_penjualan : {type: sequalize.STRING},
  id_produk : {type: sequalize.STRING},
  qty : {type: sequalize.STRING},
  harga_produk : {type: sequalize.STRING},
  satuan : {type: sequalize.STRING}
})



detail_po_penjualan.removeAttribute('id')
module.exports = detail_po_penjualan