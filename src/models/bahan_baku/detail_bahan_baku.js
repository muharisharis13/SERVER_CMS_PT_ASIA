const { db } = require('../../../database/database')
const sequalize = require('sequelize')


const detail_bahan_baku = db.define('detail_bahan_baku',{
  id_bahan_baku : {type:sequalize.STRING},
  id_produk : {type:sequalize.STRING},
  qty : {type:sequalize.STRING},

})

detail_bahan_baku.removeAttribute('id')

module.exports = detail_bahan_baku