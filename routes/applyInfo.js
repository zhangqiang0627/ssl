let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('applyInfo', {
    title: '详细信息',
    memberType: req.query.memberType,
    memberID: req.query.memberID
  });
});

router.get('/search', function(req, res, next) {
  let memberType = req.query.memberType;
  let memberID = req.query.memberID;
  let sql = '';
  if (memberType === 'C') {
    sql = sqlCommand.searchCompanyMemberByIDSql(memberID);
  } else {
    sql = sqlCommand.searchPersonalMemberByIDSql(memberID);
  }
  mysql.query(sql, function (err,result,fields) {
    res.json({
      err: err,
      result: result
    });
  })
});

router.put('/approve', function (req, res, next) {
  let memberType = req.body.memberType;
  let memberID = req.body.memberID;
  let status = req.body.status;
  let parameters = [status, memberID];
  let sql = '';
  if (memberType === 'C') {
    sql = sqlCommand.changeCompanyMemberStatusSql();
  } else {
    sql = sqlCommand.changePersonalMemberStatusSql();
  }
  mysql.update(sql, parameters, function (err, result, fields) {
    res.json({
      err: err,
      result: result
    });
  })
});

module.exports = router;