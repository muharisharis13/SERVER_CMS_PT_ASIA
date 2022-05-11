
const sequalize = require('sequelize')
const { db } = require('../../../database/database')

const header_pembelian = db.define('header_pembelian',{
  id_pembelian : {type:sequalize.STRING, primaryKey:true, unique:true},
  id_supplier : {type:sequalize.STRING},
  tanggal_jatuh_tempo : {type:sequalize.DATE},
  status : {type:sequalize.STRING},
  bukti_faktur_pembelian : {type:sequalize.STRING},
  bukti_bayar_pembelian : {type:sequalize.STRING},
  total : {type:sequalize.STRING}
})

header_pembelian.removeAttribute('id')

module.exports = header_pembelian