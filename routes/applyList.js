let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let logger = require('../service/logger');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('applyList', { title: '会员申请列表' });
});

router.get('/search', function(req, res, next) {
  let memberType = req.query.memberType;
  let status = req.query.status;
  let content = req.query.content;
  let pageNumber = parseInt(req.query.pageNumber);
  let pageSize = 10;
  let startIndex = (pageNumber - 1) * pageSize;
  let sql = '';
  switch (memberType) {
    case 'A':
      sql = sqlCommand.searchApplyListSql(startIndex, pageSize, status);
      break;
    case 'C':
      sql = sqlCommand.searchCompanyMemberListSql(startIndex, pageSize, content, status);
      break;
    case 'P':
      sql = sqlCommand.searchPersonalMemberListSql(startIndex, pageSize, content, status);
      break;
  }
  mysql.query(sql, function (err,result,fields) {
    logger.error(err);
    if (err !== null) {
      console.log(err.message);
    }
    res.json({
      err: err,
      result: result
    });
  })
});

module.exports = router;