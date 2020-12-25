let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('applyList', { title: '会员申请列表' });
});

router.get('/search', function(req, res, next) {
  let memberType = req.query.memberType;
  let content = req.query.content;
  let pageNumber = parseInt(req.query.pageNumber);
  let pageSize = 10;
  let startIndex = (pageNumber - 1) * pageSize;
  let sql = '';
  switch (memberType) {
    case 'A':
      sql = sqlCommand.searchApplyListSql(startIndex, pageSize);
      break;
    case 'C':
      sql = sqlCommand.searchCompanyMemberListSql(startIndex, pageSize, content);
      break;
    case 'P':
      sql = sqlCommand.searchPersonalMemberListSql(startIndex, pageSize, content);
      break;
  }
  mysql.query(sql, function (err,result,fields) {
    res.json({
      err: err,
      result: result
    });
  })
});

module.exports = router;