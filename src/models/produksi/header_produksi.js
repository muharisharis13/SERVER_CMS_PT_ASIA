const { db } = require('../../../database/database')
const sequalize = require('sequelize')


const header_produksi = db.define('header_produksi',{
  id_produksi : {type:sequalize.STRING, primaryKey:true},

})

header_produksi.removeAttribute('id')

module.exports = header_produksi