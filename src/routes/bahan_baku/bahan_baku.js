const express = require('express')
const { addBahanBaku, getBahanBaku } = require('../../controller/bahan_baku/bahan_baku')
const router = express.Router()


router.get('/', getBahanBaku)
router.post('/', addBahanBaku)

module.exports = router