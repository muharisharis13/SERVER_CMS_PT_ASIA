const sequalize = require('sequelize')
const { db } = require('../../../database/database')


const Pelanggan = db.define("pelanggan", {
  id_pelanggan : {type : sequalize.STRING, primaryKey : true},
  nama_pelanggan : {type : sequalize.STRING},
  alamat_pelanggan : {type : sequalize.STRING},
  no_telepon : {type : sequalize.STRING},
  password : {type : sequalize.STRING},
},{
  freezetableName : true,
  timestamps : true
})

Pelanggan.removeAttribute('id')


module.exports = Pelanggan