const express = require('express');
const { addSupir, getSupirController } = require('../../controller/supir/supir');
const router = express.Router()


router.get('/',getSupirController)
router.post('/',addSupir)


module.exports = router;