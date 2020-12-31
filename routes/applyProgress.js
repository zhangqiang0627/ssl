let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let logger = require('../service/logger');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('applyProgress', { title: '审批进度查询' });
});

router.get('/search', function(req, res, next) {
  let memberType = req.query.memberType;
  let content = req.query.content;
  let sql = '';
  if (memberType === 'C') {
    sql = sqlCommand.searchCompanyMemberSql(content);
  } else {
    sql = sqlCommand.searchPersonalMemberSql(content);
  }
  mysql.query(sql, function (err,result,fields) {
    logger.error(err);
    res.json({
      err: err,
      result: result
    });
  })
});

module.exports = router;