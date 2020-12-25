var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('applyComplete', {
    title: '申请完成',
    memberType: req.query.memberType,
    businessLicenseNumber: req.query.businessLicenseNumber,
    cellphone: req.query.cellphone
  });
});

module.exports = router;