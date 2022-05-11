const sequalize = require('sequelize')
const { db } = require('../../../database/database')



const header_penjualan = db.define('header_penjualan',{
  id_penjualan : {type:sequalize.STRING, primaryKey:true, unique:true},
  id_pelanggan : {type:sequalize.STRING},
  tanggal_jatuh_tempo : {type:sequalize.DATE},
  status : {type:sequalize.STRING},
  total : {type:sequalize.STRING},
  catatan : {type:sequalize.STRING},
  bukti_bayar_penjualan : {type:sequalize.STRING},
})


header_penjualan.removeAttribute('id')

module.exports = header_penjualan