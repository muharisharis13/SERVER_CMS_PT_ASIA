const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors  = require('cors')
const {db}  = require('./database/database')
const pelanggan = require('./src/routes/pelanggan/pelanggan')
const supir = require('./src/routes/supir/supir')
const admin = require('./src/routes/admin/admin')
const supplier = require('./src/routes/supplier/supplier')
const produk = require('./src/routes/produk/produk')
const po_penjualan = require('./src/routes/po_penjualan/po_penjualan')
const penjualan = require('./src/routes/penjualan/penjualan')
const po_pembelian = require('./src/routes/po_pembelian/po_pembelian')
const pembelian = require('./src/routes/pembelian/pembelian')
const produksi = require('./src/routes/produksi/produksi')
const bahan_baku = require('./src/routes/bahan_baku/bahan_baku')
const { checkToken } = require('./token/token')
const { noTelepon, changePassword } = require('./src/controller/pelanggan/pelanggan')


app.use(cors())

app.options('*', cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))

app.use('/uploads/bukti_bayar_penjualan', express.static('./uploads/bukti_bayar_penjualan'))
app.use('/uploads/bukti_faktur_pembelian', express.static('./uploads/bukti_faktur_pembelian'))
app.use('/uploads/bukti_bayar_pembelian', express.static('./uploads/bukti_bayar_pembelian'))
app.use('/uploads/produk', express.static('./uploads/produk'))



app.use('/v1/pelanggan', pelanggan)
app.use('/v1/supir', supir)
app.use('/v1/admin', admin)
app.use('/v1/supplier', checkToken ,supplier)
app.use('/v1/produk', checkToken ,produk)
app.use('/v1/po_penjualan', checkToken ,po_penjualan)
app.use('/v1/penjualan', checkToken ,penjualan)
app.use('/v1/po_pembelian', checkToken ,po_pembelian)
app.use('/v1/pembelian', checkToken ,pembelian)
app.use('/v1/produksi', checkToken ,produksi)
app.use('/v1/bahan_baku', checkToken ,bahan_baku)
app.post('/v1/checknoTelepon', noTelepon)
app.post('/v1/changePassword', changePassword)







app.get('/', (req, res)=>{
  res.send('hellow word')
})






db.sync({})
db.authenticate().then(()=> console.log('berhasil terkoneksi dengan database'))

app.listen(1234, ()=>{
  console.log('server jalan di port 1234')
})