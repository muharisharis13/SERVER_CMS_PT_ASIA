const express = require('express');
const { addPenjualan, getPenjualan, uploadbuktibayar } = require('../../controller/penjualan/penjualan');
const router  = express.Router();
const multer = require('multer')

let storageFile = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null,'./uploads/bukti_bayar_penjualan')
  },
  filename:(req, file, cb)=>{
    cb(null, Date.now() + file.originalname)
  }
})

let upload = multer({storage:storageFile})


router.post('/:id_penjualan',upload.single('bukti_bayar_penjualan'),uploadbuktibayar)
router.post('/', addPenjualan)
router.get('/:id_pelanggan', getPenjualan)
router.get('/', getPenjualan)

module.exports = router