var router = require('express').Router();

router.use('/wallets', require('./wallets'));
router.use('/coins', require('./coins'));

module.exports = router;