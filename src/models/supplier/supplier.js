const sequalize = require('sequelize')
const {db} = require('../../../database/database')


const Supplier = db.define("supplier", {
  id_supplier : {type : sequalize.STRING, primaryKey: true},
  nama_supplier : {type: sequalize.STRING},
  alamat_supplier : {type: sequalize.STRING},
  no_telepon_supplier : {type: sequalize.STRING},
})

Supplier.removeAttribute('id')

module.exports = Supplier