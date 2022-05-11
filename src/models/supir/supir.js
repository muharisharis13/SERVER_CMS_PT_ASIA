const sequalize = require('sequelize')
const { db } = require('../../../database/database')


const supir = db.define('supir', {
  id_supir :{type : sequalize.STRING, primaryKey : true, allowNull:false},
  nama_supir : {type: sequalize.STRING, allowNull:false},
  alamat_supir : {type: sequalize.STRING, allowNull:false},
  no_telepon : {type: sequalize.STRING, allowNull:false},
},{
  freezetableName : true,
  timestamps : true
})

supir.removeAttribute('id')

module.exports = supir