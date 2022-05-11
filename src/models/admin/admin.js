const sequalize = require('sequelize')
const { db } = require('../../../database/database')


exports.admin = db.define('user', {
  id_user :{type : sequalize.STRING, primaryKey : true, allowNull:false},
  username : {type: sequalize.STRING, allowNull:false},
  password : {type: sequalize.STRING, allowNull:false},
  role : {type: sequalize.STRING, allowNull:false},
},{
  freezetableName : true,
  timestamps : true
})

this.admin.removeAttribute('id')