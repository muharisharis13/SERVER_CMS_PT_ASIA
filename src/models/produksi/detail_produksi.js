const { db } = require('../../../database/database')
const sequalize = require('sequelize')


const detail_produksi = db.define('detail_produksi',{
  id_produksi : {type:sequalize.STRING},
  id_produk : {type: sequalize.STRING},
  qty : {type:sequalize.STRING},

})

detail_produksi.removeAttribute('id')

module.exports = detail_produksi