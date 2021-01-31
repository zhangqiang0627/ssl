let app = new Vue({
  el: '#app',
  data: {
    fullName: '',
    fullNameIsValid: '',
    fullNameInValidMsg: '',
    sex: '',
    sexIsValid: '',
    sexInValidMsg: '',
    sexText: '请选择性别（必选项）',
    educationLevel: '',
    educationLevelText: '请选择文化程度（必选项）',
    educationLevelIsValid: '',
    educationLevelInValidMsg: '',
    cellphone: '',
    cellphoneIsValid: '',
    cellphoneInValidMsg: '',
    politicsType: '',
    politicsTypeText: '请选择政治面貌',
    weiChat: '',
    email: '',
    emailIsValid: '',
    emailInValidMsg: '',
    telephone: '',
    workUnit: '',
    title: '',
    homeAddress: '',
    identityCardNo: '',
    resumeArray: [],
    resumes: '',
    resumeIsEmpty: false,
    checkedMemo: false,
    checkedMemoIsValid: '',
    checkedMemoInValidMsg: ''
  },
  methods: {
    initDataVerifyToDefault: function () {
      this.fullNameIsValid = '';
      this.fullNameInValidMsg = '';
      this.sexIsValid = '';
      this.sexInValidMsg = '';
      this.educationLevelIsValid = '';
      this.educationLevelInValidMsg = '';
      this.emailIsValid = '';
      this.emailInValidMsg = '';
      this.cellphoneIsValid = '';
      this.cellphoneInValidMsg = '';
      this.resumeIsEmpty = false;
      this.resumeArray.forEach((item) => {
        item.fromDateIsEmpty = false;
        item.toDateIsEmpty = false;
        item.unitNameIsEmpty = false;
        item.titleIsEmpty = false;
      })
    },
    onSexChange: function (code, text) {
      this.sex = code;
      this.sexText = text;
    },
    onPoliticsTypeChange: function (code, text) {
      this.politicsType = code;
      this.politicsTypeText = text;
    },
    onEducationLevelChange: function (code, text) {
      this.educationLevel = code;
      this.educationLevelText = text;
    },
    onAddResume: function () {
      this.resumeArray.push({
        fromDate: '',
        fromDateIsEmpty: false,
        toDate: '',
        toDateIsEmpty: false,
        unitName: '',
        unitNameIsEmpty: false,
        title: '',
        titleIsEmpty: false,
      });
    },
    onRemoveResume: function (index) {
      this.resumeArray.splice(index, 1);
    },
    checkData: function () {
      this.initDataVerifyToDefault();
      let checkResult = true;
      if (dataVerify.isEmpty(this.fullName)) {
        this.fullNameIsValid = 'N';
        this.fullNameInValidMsg = '请填写您的姓名';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.sex)) {
        this.sexIsValid = 'N';
        this.sexInValidMsg = '请选择性别';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.educationLevel)) {
        this.educationLevelIsValid = 'N';
        this.educationLevelInValidMsg = '请选择文化程度';
        checkResult = false;
      }
      if (dataVerify.isEmpty(this.cellphone)) {
        this.cellphoneIsValid = 'N';
        this.cellphoneInValidMsg = '请填写手机号码';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.cellphone) && !dataVerify.isCellphone(this.cellphone)) {
        this.cellphoneIsValid = 'N';
        this.cellphoneInValidMsg = '您填写的不是一个手机号码';
        checkResult = false;
      }
      if (!dataVerify.isEmpty(this.email) && !dataVerify.isEmail(this.email)) {
        this.emailIsValid = 'N';
        this.emailInValidMsg = '您填写的不是一个电子邮件地址';
        checkResult = false;
      }
      if (this.resumeArray.length === 0) {
        this.resumeIsEmpty = true;
        checkResult = false;
      }
      if (this.resumeArray.length > 0) {
        this.resumeArray.forEach((item) => {
          if (dataVerify.isEmpty(item.fromDate)) {
            item.fromDateIsEmpty = true;
            checkResult = false;
          }
          if (dataVerify.isEmpty(item.toDate)) {
            item.toDateIsEmpty = true;
            checkResult = false;
          }
          if (dataVerify.isEmpty(item.unitName)) {
            item.unitNameIsEmpty = true;
            checkResult = false;
          }
          if (dataVerify.isEmpty(item.title)) {
            item.titleIsEmpty = true;
            checkResult = false;
          }
        })
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
      let cellphone = this.cellphone;
      let resumeList =  [];
      this.resumeArray.forEach((item) => {
        resumeList.push({
          fromDate: item.fromDate,
          toDate: item.toDate,
          unitName: item.unitName,
          title: item.title,
        })
      });
      this.resumes = JSON.stringify(resumeList);

      axios.get('/apply/progress/search'
          .concat(`?memberType=P`)
          .concat(`&content=${this.cellphone}`))
          .then(res => {
            if (res.data.err) {
              $('#btnSubmit').button('reset');
              messager.error('系统发生异常，数据查询失败。');
              return false;
            }
            if (res.data.result.length > 0) {
              $('#btnSubmit').button('reset');
              messager.info(`该手机号码已申请过会员`);
              return false;
            }
            axios.post('/apply/personal/add', {
              fullName: this.fullName,
              sex: this.sex,
              educationLevel: this.educationLevel,
              cellphone: this.cellphone,
              politicsType: this.politicsType,
              weiChat: this.weiChat,
              email: this.email,
              telephone: this.telephone,
              workUnit: this.workUnit,
              title: this.title,
              homeAddress: this.homeAddress,
              identityCardNo: this.identityCardNo,
              resumes: this.resumes
            })
            .then(function(res) {
              if (res.data.err) {
                $('#btnSubmit').button('reset');
                messager.error('系统发生异常，提交失败。')
                return false;
              }
              $('#btnSubmit').button('reset');
              location.href = `/apply/complete?memberType=P&cellphone=${cellphone}`;
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
  },

});