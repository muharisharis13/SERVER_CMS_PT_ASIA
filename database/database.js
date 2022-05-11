const sequalize = require('sequelize')



exports.db = new sequalize('db_asiatirtamakmur_3', 'root','',{
  dialect : 'mysql',
  host : 'localhost'
})


