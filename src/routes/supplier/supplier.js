const express = require('express')
const { checkToken } = require('../../../token/token')
const { addSupplier, editSupplier, deleteSupplier, getSupplier } = require('../../controller/supplier/supplier')
const router = express.Router()

router.get('/', getSupplier)
router.post('/', addSupplier)
router.post('/:id_sup', editSupplier)
router.delete('/:id_sup', deleteSupplier)

module.exports = router