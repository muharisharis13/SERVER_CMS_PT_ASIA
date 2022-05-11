const express = require('express');
const { registerAdmin, loginAdmin } = require('../../controller/admin/admin');
const router = express.Router();

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)

module.exports = router;