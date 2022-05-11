const express = require('express');
const { checkToken } = require('../../../token/token');
const router  = express.Router();
const { registerController, loginPelanggan, editPelanggan, deletePelanggan, getPelanggan, noTelepon, otp } = require('../../controller/pelanggan/pelanggan');

router.get('/',getPelanggan)
router.get('/otp',otp)
router.post('/register', registerController)
router.post('/login', loginPelanggan)
router.post('/:id_pelanggan',checkToken, editPelanggan)
router.delete('/:id_pelanggan',checkToken, deletePelanggan)


module.exports = router;