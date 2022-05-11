const sequalize = require('sequelize')
const { db } = require('../../../database/database')

const detail_po_pembelian = db.define('detail_po_pembelian',{
  id_po_pembelian : {type:sequalize.STRING},
  id_produk : {type:sequalize.STRING},
  qty:{type:sequalize.STRING}
})

detail_po_pembelian.removeAttribute('id')

module.exports = detail_po_pembelian