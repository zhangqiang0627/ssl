let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
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
    res.json({
      err: err,
      result: result
    });
  })
});

module.exports = router;