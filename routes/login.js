let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let logger = require('../service/logger');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: '管理员登录' });
});

router.get('/search', function(req, res, next) {
  let account = req.query.account;
  let password = req.query.password;
  let sql = sqlCommand.searchAdminSql(account, password);
  mysql.query(sql, function (err,result,fields) {
    logger.error(err);
    res.json({
      err: err,
      result: result
    });
  })
});

module.exports = router;