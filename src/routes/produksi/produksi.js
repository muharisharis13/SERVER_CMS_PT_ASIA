const express = require('express')
const { addProduksi, gethasilProduksi } = require('../../controller/produksi/produksi')
const router = express.Router()

router.post('/',addProduksi)
router.get('/',gethasilProduksi)

module.exports = router