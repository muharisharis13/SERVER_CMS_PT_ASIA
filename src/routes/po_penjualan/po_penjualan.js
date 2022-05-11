const express = require('express')
const { addPoPenjualan, getPoPenjualan, getPoPenjualanAdm, sendReject } = require('../../controller/po_penjualan/po_penjualan')
const router = express.Router()

router.post('/', addPoPenjualan)
router.post('/reject/:id_po_penjualan', sendReject)
router.get('/:id_pelanggan', getPoPenjualan)
router.get('/', getPoPenjualan)


module.exports = router