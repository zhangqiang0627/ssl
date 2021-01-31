let app = new Vue({
  el: '#app',
  data: {
    companyName: '',
    companyNameIsValid: '',
    companyNameInValidMsg: '',
    companyType: '',
    companyTypeIsValid: '',
    companyTypeInValidMsg: '',
    companyTypeText: '请选择单位类型（必选项）',
    establishDate: '',
    establishDateIsValid: '',
    establishDateInValidMsg: '',
    companyLeader: '',
    companyOwner: '',
    companyOwnerIsValid: '',
    companyOwnerInValidMsg: '',
    cellphone: '',
    cellphoneIsValid: '',
    cellphoneInValidMsg: '',
    companyTelephone: '',
    companyEmail: '',
    companyEmailIsValid: '',
    companyEmailInValidMsg: '',
    companyFax: '',
    companyHomePage: '',
    companyAddress: '',
    businessLicenseNumber: '',
    businessLicenseNumberIsValid: '',
    businessLicenseNumberInValidMsg: '',
    businessLicensePicture: '',
    mainBusiness: '',
    staffTotal: '',
    staffTotalIsValid: '',
    staffTotalInValidMsg: '',
    floorSpace: '',
    floorSpaceIsValid: '',
    floorSpaceInValidMsg: '',
    turnover: '',
    turnoverIsValid: '',
    turnoverInValidMsg: '',
    fixedAssets: '',
    fixedAssetsIsValid: '',
    fixedAssetsInValidMsg: '',
    contactsName: '',
    contactsNameIsValid: '',
    contactsNameInValidMsg: '',
    contactsTitle: '',
    contactsTell: '',
    contactsCellphone: '',
    contactsCellphoneIsValid: '',
    contactsCellphoneInValidMsg: '',
    contactsEmail: '',
    contactsEmailIsValid: '',
    contactsEmailInValidMsg: '',
    checkedMemo: false,
    checkedMemoIsValid: '',
    checkedMemoInValidMsg: ''
  },
  methods: {
    initDataVerifyToDefault: function () {
      this.companyNameIsValid = '';
      this.companyNameInValidMsg = '';
      this.companyTypeIsValid = '';
      this.companyTypeInValidMsg = '';
      this.companyOwnerIsValid = '';
      this.companyOwnerInValidMsg = '';
      this.cellphoneIsValid = '';
      this.cellphoneInValidMsg = '';
      this.companyEmailIsValid = '';
      this.companyEmailInValidMsg = '';

      this.staffTotalIsValid = '';
      this.staffTotalInValidMsg = '';
      this.floorSpaceIsValid = '';
      this.floorSpaceInValidMsg = '';
      this.turnoverIsValid = '';
      this.turnoverInValidMsg = '';
      this.fixedAssetsIsValid = '';
      this.fixedAssetsInValidMsg = '';

      this.contactsNameIsValid = '';
      this.contactsNameInValidMsg = '';
      this.contactsCellphoneIsValid = '';
      this.contactsCellphoneInValidMsg = '';
      this.contactsEmailIsValid = '';
      this.contactsEmailInValidMsg = '';
    },
    onCompanyTypeChange: function (code, text) {
      this.companyType = code;
      this.companyTypeText = text;
    },
    checkData: function () {
      this.initDataVerifyToDefault();
      let checkResult = true;
      if (dataVerify.isEmpty(this.companyName)) {
        this.companyNameIsValid = 'N';
        this.companyNameInValidMsg = '请填写单位名称';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.companyType)) {
        this.companyTypeIsValid = 'N';
        this.companyTypeInValidMsg = '请选择单位类型';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.establishDate) && !dataVerify.isDate(this.establishDate)) {
        this.establishDateIsValid = 'N';
        this.establishDateInValidMsg = '日期格式不正确（正确格式：YYYY-MM-DD）';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.companyOwner)) {
        this.companyOwnerIsValid = 'N';
        this.companyOwnerInValidMsg = '请填写法人代表';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.cellphone) && !dataVerify.isCellphone(this.cellphone)) {
        this.cellphoneIsValid = 'N';
        this.cellphoneInValidMsg = '您填写的不是一个手机号码';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.companyEmail) && !dataVerify.isEmail(this.companyEmail)) {
        this.companyEmailIsValid = 'N';
        this.companyEmailInValidMsg = '您填写的不是一个电子邮件地址';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.businessLicenseNumber)) {
        this.businessLicenseNumberIsValid = 'N';
        this.businessLicenseNumberInValidMsg = '请填写营业执照编号';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.staffTotal) && !dataVerify.isNumber(this.staffTotal)) {
        this.staffTotalIsValid = 'N';
        this.staffTotalInValidMsg = '员工人数必须是一个数字';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.floorSpace) && !dataVerify.isDecimal(this.floorSpace)) {
        this.floorSpaceIsValid = 'N';
        this.floorSpaceInValidMsg = '占地面积必须是一个数字';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.turnover) && !dataVerify.isDecimal(this.turnover)) {
        this.turnoverIsValid = 'N';
        this.turnoverInValidMsg = '年营业额必须是一个数字';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.fixedAssets) && !dataVerify.isDecimal(this.fixedAssets)) {
        this.fixedAssetsIsValid = 'N';
        this.fixedAssetsInValidMsg = '固定资产必须是一个数字';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.contactsName)) {
        this.contactsNameIsValid = 'N';
        this.contactsNameInValidMsg = '请填写联系人姓名';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.contactsCellphone)) {
        this.contactsCellphoneIsValid = 'N';
        this.contactsCellphoneInValidMsg = '请填写联系人手机号码';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.contactsCellphone) && !dataVerify.isCellphone(this.contactsCellphone)) {
        this.contactsCellphoneIsValid = 'N';
        this.contactsCellphoneInValidMsg = '您填写的不是一个手机号码';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.contactsEmail) && !dataVerify.isEmail(this.contactsEmail)) {
        this.contactsEmailIsValid = 'N';
        this.contactsEmailInValidMsg = '您填写的不是一个电子邮件地址';
        checkResult = false;
      }
      if (!this.checkedMemo) {
        this.checkedMemoIsValid = 'N';
        this.checkedMemoInValidMsg = '请选择是否阅读了会员要求';
        checkResult = false;
      }

      return checkResult;
    },
    submit: function () {
      $('#btnSubmit').button('loading');
      let businessLicenseNumber = this.businessLicenseNumber;
      axios.get('/apply/progress/search'
          .concat(`?memberType=C`)
          .concat(`&content=${this.businessLicenseNumber}`))
          .then(res => {
            if (res.data.err) {
              $('#btnSubmit').button('reset');
              messager.error('系统发生异常，数据查询失败。');
              return false;
            }
            if (res.data.result.length > 0) {
              $('#btnSubmit').button('reset');
              messager.info(`该企业已申请过会员`);
              return false;
            }

            axios.post('/apply/company/add', {
              companyName: this.companyName,
              companyType: this.companyType,
              establishDate: this.establishDate,
              companyLeader: this.companyLeader,
              companyOwner: this.companyOwner,
              cellphone: this.cellphone,
              companyTelephone: this.companyTelephone,
              companyEmail: this.companyEmail,
              companyFax: this.companyFax,
              companyHomePage: this.companyHomePage,
              companyAddress: this.companyAddress,
              businessLicenseNumber: this.businessLicenseNumber,
              businessLicensePicture: this.businessLicensePicture,
              mainBusiness: this.mainBusiness,
              staffTotal: dataVerify.isEmpty(this.staffTotal) ? 0 : this.staffTotal,
              floorSpace: dataVerify.isEmpty(this.floorSpace) ? 0 : this.floorSpace,
              turnover: dataVerify.isEmpty(this.turnover) ? 0 : this.turnover,
              fixedAssets: dataVerify.isEmpty(this.fixedAssets) ? 0 : this.fixedAssets,
              contactsName: this.contactsName,
              contactsTitle: this.contactsTitle,
              contactsTell: this.contactsTell,
              contactsCellphone: this.contactsCellphone,
              contactsEmail: this.contactsEmail
            })
            .then(function(res) {
              if (res.data.err) {
                $('#btnSubmit').button('reset');
                messager.error('系统发生异常，提交失败。')
                return false;
              }
              $('#btnSubmit').button('reset');
              location.href = `/apply/complete?memberType=C&businessLicenseNumber=${businessLicenseNumber}`;
            })
            .catch(function(error) {
              $('#btnSubmit').button('reset');
              messager.error('无法连接网络，请检查网络设置。');
            });
          })
          .catch(err => {
            $('#btnSubmit').button('reset');
            messager.error('无法连接网络，请检查网络设置。');
          })
    },
    onSubmit: function () {
      if (!this.checkData()) {
        messager.info('您输入信息有误，请根据提示修改');
        return false;
      }
      this.submit();
    }
  }
});