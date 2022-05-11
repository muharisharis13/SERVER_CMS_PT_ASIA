const { id } = require('../../../generator_id/generator_id')
const Supplier = require('../../models/supplier/supplier')
const moment = require(`moment`)
const{Op} = require('sequelize')

exports.deleteSupplier = async function(req, res){
  const {id_sup} = req.params
  try {
    await Supplier.destroy({where : {id_supplier:id_sup}})
    .then(hasil => {
      res.status(200).json({
        message : 'success',
        data: hasil
      })
    })
    
  } catch (err) {
    res.status(500).json({
      message : 'error',
      data : err
    })
  }
}

exports.editSupplier = async function(req, res){
  const {id_sup} = req.params
  const {nama_supplier, alamat_supplier, no_telepon} = req.body
  try {

    await Supplier.findOne({where : {id_supplier : id_sup}})
    .then(hasil1 => {
      hasil1.update({
        nama_supplier : nama_supplier,
        alamat_supplier : alamat_supplier,
        no_telepon_supplier : no_telepon
      })
      .then(hasil2=>{
        res.status(200).json({
          message : 'success',
          data : hasil2
        })
      })
    })
    
  } catch (err) {
    res.status(500).json({
      message : 'error',
      data : err
    })
  }
}

exports.getSupplier = async function(req, res){
  const {search,limit} = req.query
  try {
    let data = await Supplier.findAll(
      search ? 
      {
        where : {
          nama_supplier : {
            [Op.like] : `%${search}%`
          }
        },limit:limit ? parseInt(limit) : 10
     }
     :{limit:limit ? parseInt(limit) : 10}
    )
    
    res.status(200).json({
      message : 'success',
      data : data
    })

  } catch (err) {
    res.status(500).json({
      message : 'error',
      data : err
    })
  }
}
exports.addSupplier = async function(req, res){
  const {nama_supplier, alamat_supplier, no_telepon} = req.body
  try {
    let data = await Supplier.create({
      nama_supplier : nama_supplier,
      alamat_supplier : alamat_supplier,
      no_telepon_supplier : no_telepon,
      id_supplier : `SUPP${moment(new Date()).format('hhmmss')}`
    })
    
    res.status(200).json({
      message : 'success',
      data : data
    })

  } catch (err) {
    res.status(500).json({
      message : 'error',
      data : err
    })
  }
}