let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let logger = require('../service/logger');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('personalApply', { title: '个人申请' });
});

router.post('/add', function(req, res, next) {
  let sql = sqlCommand.insertPersonalMemberSql();
  let parameters = [
    req.body.fullName,
    req.body.sex,
    req.body.politicsType,
    req.body.educationLevel,
    req.body.weiChat,
    req.body.email,
    req.body.cellphone,
    req.body.telephone,
    req.body.workUnit,
    req.body.title,
    req.body.homeAddress,
    req.body.identityCardNo,
    req.body.resumes];
  mysql.insert(sql, parameters, function (err, result, fields) {
    logger.error(err);
    res.json({
      err: err,
      result: result
    });
  });
});

module.exports = router;