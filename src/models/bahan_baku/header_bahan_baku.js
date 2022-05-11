const { db } = require('../../../database/database')
const sequalize = require('sequelize')


const header_bahan_baku = db.define('header_bahan_baku',{
  id_bahan_baku : {type:sequalize.STRING, primaryKey:true}
})

header_bahan_baku.removeAttribute('id')

module.exports = header_bahan_baku