const express = require('express')
const { addProduk, editProduk, editHarga, getProduk, getBahanBaku } = require('../../controller/produk/produk')
const router = express.Router()
const multer = require('multer')

let storageFile = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null,'./uploads/produk')
  },
  filename:(req, file, cb)=>{
    cb(null, Date.now() + file.originalname)
  }
})

let upload = multer({storage:storageFile})

router.get('/',getProduk)
router.get('/bahanbaku',getBahanBaku)
router.post('/',upload.single('image_produk'), addProduk)
router.post('/:id_produk', editProduk)
router.post('/harga/:id_produk', editHarga)

module.exports =router