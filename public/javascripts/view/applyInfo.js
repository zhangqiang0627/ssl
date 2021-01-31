let app = new Vue({
  el: "#app",
  data: {
    memberType: '',// C:单位会员 P:个人会员
    memberID: 0,
    title: '',
    noData: false,
    certificateNumberPrefix: '',
    certificateNumber: '',
    certificateNumberIsValid: '',
    certificateNumberInValidMsg: '',
    companyInfo: {},
    personalInfo: {},
    dataStatus: 'P',
    dataStatusText: '待审批'
  },
  methods: {
    initPage: function () {
      this.memberType = $('#hidden_memberType').val();
      this.memberID = $('#hidden_memberID').val();
      this.setTitle();
      this.getCertificateNumber();
      this.searchInfo();
    },
    setTitle: function () {
      if (this.memberType === 'C') {
        this.title = '陕西物流学会单位会员申请登记表';
        this.certificateNumberPrefix = 'SSL-DW-';
      } else {
        this.title = '陕西物流学会个人会员申请登记表';
        this.certificateNumberPrefix = 'SSL-GR-';
      }
    },
    getCertificateNumber: function () {
      if (this.dataStatus === 'Y') {
        return false;
      }
      axios.get('/cms/apply/info/certificateNumber'
          .concat(`?memberType=${this.memberType}`))
          .then(res => {
            if (res.data.err) {
              messager.error('系统发生异常，数据查询失败。');
              return false;
            }
            this.certificateNumber = res.data.result[0].certificate_number.toString().padStart(4, '0');
          })
          .catch(err => {
            messager.error('无法连接网络，请检查网络设置。');
          })
    },
    searchInfo: function () {
      axios.get('/cms/apply/info/search'
          .concat(`?memberType=${this.memberType}`)
          .concat(`&memberID=${this.memberID}`))
      .then(res => {
        if (res.data.err) {
          messager.error('系统发生异常，数据查询失败。');
          return false;
        }
        if(res.data.result.length === 0) {
          this.noData = true;
          return false;
        }
        if (this.memberType === 'C') {
          this.companyInfo = res.data.result[0];
          this.dataStatus = this.companyInfo.data_status;
          this.dataStatusText = this.companyInfo.data_status_text;
          if (this.dataStatus === 'Y') {
            this.certificateNumber = this.companyInfo.certificate_number.toString().padStart(4, '0');
          }
        } else {
          this.personalInfo = res.data.result[0];
          this.personalInfo.resumeList = JSON.parse(this.personalInfo.resumes);
          this.dataStatus = this.personalInfo.data_status;
          this.dataStatusText = this.personalInfo.data_status_text;
          if (this.dataStatus === 'Y') {
            this.certificateNumber = this.personalInfo.certificate_number.toString().padStart(4, '0');
          }
        }
      })
      .catch(err => {
        messager.error('无法连接网络，请检查网络设置。');
      })
    },
    onShowCertificate: function () {
      window.open(`/certificate/pc?memberType=${this.memberType}&memberID=${this.memberID}`);
    },
    onBack: function () {
      location.href = '/cms/apply/list';
    },
    onReject: function () {
      let that = this;
      axios.put('/cms/apply/info/approve', {
        memberType: this.memberType,
        memberID: this.memberID,
        status: 'N'
      }).then(function(res) {
        if (res.data.err) {
          messager.error('系统发生异常，提交失败。')
          return false;
        }
        that.dataStatus = 'N';
        that.dataStatusText = '审批未通过';
        layer.msg('审批成功！');
      }).catch(function(error) {
        messager.error('无法连接网络，请检查网络设置。');
      });
    },

    checkData: function () {
      if (dataVerify.isEmpty(this.certificateNumber)) {
        this.certificateNumberIsValid = 'N';
        this.certificateNumberInValidMsg = '请填写证书编号';
        return false;
      }
      if (!dataVerify.isNumber(this.certificateNumber)) {
        this.certificateNumberIsValid = 'N';
        this.certificateNumberInValidMsg = '证书编号只能是4位数字';
        return false;
      }
      if (this.certificateNumber.length < 4) {
        this.certificateNumber = this.certificateNumber.padStart(4, '0');
      }
      return true;
    },
    onApprove: function () {
      if (!this.checkData()) {
        return false;
      }
      let that = this;
      axios.get('/cms/apply/info/check/certificateNumber'
          .concat(`?memberType=${this.memberType}`)
          .concat(`&certificateNumber=${this.certificateNumber}`))
          .then(res => {
            if (res.data.err) {
              messager.error('系统发生异常，数据查询失败。');
              return false;
            }
            if (res.data.result[0].total_count > 0) {
              that.certificateNumberIsValid = 'N';
              that.certificateNumberInValidMsg = '该证书编号已被占用';
              return false;
            }
            axios.put('/cms/apply/info/approve', {
              memberType: that.memberType,
              memberID: that.memberID,
              certificateNumber: that.certificateNumber,
              status: 'Y'
            }).then(function(res) {
              if (res.data.err) {
                messager.error('系统发生异常，提交失败。')
                return false;
              }
              that.dataStatus = 'Y';
              that.dataStatusText = '审批通过';
              layer.msg('审批成功！');
            }).catch(function(error) {
              messager.error('无法连接网络，请检查网络设置。');
            });
          })
          .catch(err => {
            messager.error('无法连接网络，请检查网络设置。');
          })
    }
  },
  mounted() {
    this.initPage();
  },
});