var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: '陕西省物流学会会员申请' });
});

module.exports = router;
