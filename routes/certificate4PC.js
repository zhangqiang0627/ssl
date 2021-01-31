let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let logger = require('../service/logger');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('certificate4PC', {
    title: '会员证书',
    memberType: req.query.memberType,
    memberID: req.query.memberID }
    );
});

module.exports = router;