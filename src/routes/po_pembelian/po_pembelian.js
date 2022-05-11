const express = require('express')
const { addPoPembelian, changeStatus, getPoPembelian } = require('../../controller/po_pembelian/po_pembelian')
const router = express.Router()

router.post('/', addPoPembelian)
router.get('/', getPoPembelian)
router.post('/:id_po_pembelian', changeStatus)

module.exports = router