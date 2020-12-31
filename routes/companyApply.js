let express = require('express');
let sqlCommand = require('../service/sqlCommand');
let mysql = require('../data/mysql');
let logger = require('../service/logger');
let router = express.Router();

router.get('/', function(req, res, next) {
  res.render('companyApply', { title: '企业申请' });
});

router.post('/add', function(req, res, next) {
  let sql = sqlCommand.insertCompanyMemberSql();
  let parameters = [
      req.body.companyName,
      req.body.companyType,
      req.body.establishDate,
      req.body.companyLeader,
      req.body.companyOwner,
      req.body.cellphone,
      req.body.companyTelephone,
      req.body.companyEmail,
      req.body.companyFax,
      req.body.companyHomePage,
      req.body.companyAddress,
      req.body.businessLicenseNumber,
      req.body.businessLicensePicture,
      req.body.mainBusiness,
      req.body.staffTotal,
      req.body.floorSpace,
      req.body.turnover,
      req.body.fixedAssets,
      req.body.contactsName,
      req.body.contactsTitle,
      req.body.contactsTell,
      req.body.contactsCellphone,
      req.body.contactsEmail];
  mysql.insert(sql, parameters, function (err, result, fields) {
    logger.error(err);
    res.json({
      err: err,
      result: result
    });
  });
});

module.exports = router;