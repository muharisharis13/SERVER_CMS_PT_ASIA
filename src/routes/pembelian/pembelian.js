const express = require('express');
const router  = express.Router();
const multer = require('multer');
const { addPembelian, getPembelian, uploadBuktiBayarPembelian } = require('../../controller/pembelian/pembelian');


let storageFile = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null,'./uploads/bukti_faktur_pembelian')
  },
  filename:(req, file, cb)=>{
    cb(null, Date.now() + file.originalname)
  }
})

let storageFilebayar = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null,'./uploads/bukti_bayar_pembelian')
  },
  filename:(req, file, cb)=>{
    cb(null, Date.now() + file.originalname)
  }
})

let upload = multer({storage:storageFile})
let uploadbayar = multer({storage:storageFilebayar})


router.post('/', upload.single('bukti_faktur_pembelian'),addPembelian)
router.get('/', getPembelian)
router.post('/:id_pembelian',uploadbayar.single('bukti_bayar_pembelian'), uploadBuktiBayarPembelian)


module.exports = router