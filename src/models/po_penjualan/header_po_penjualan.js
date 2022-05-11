const sequalize = require('sequelize')
const { db } = require('../../../database/database')

const header_po_penjualan = db.define("header_po_penjualan",{
  id_po_penjualan : {type : sequalize.STRING, primaryKey:true, unique:true},
  id_pelanggan : {type: sequalize.STRING},
  total : {type:sequalize.STRING},
  status :{type:sequalize.STRING},
  reason :{type: sequalize.STRING}
})


header_po_penjualan.removeAttribute('id')

module.exports = header_po_penjualan