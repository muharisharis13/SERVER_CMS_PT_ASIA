const sequalize = require('sequelize')
const { db } = require('../../../database/database')

const header_po_pembelian = db.define('header_po_pembelian',{
  id_po_pembelian : {type: sequalize.STRING, primaryKey:true},
  keterangan :{type:sequalize.STRING},
  status:{type:sequalize.STRING}
})

header_po_pembelian.removeAttribute('id')
module.exports = header_po_pembelian