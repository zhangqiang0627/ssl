let app = new Vue({
  el: "#app",
  data: {
    memberType: '',// C:单位会员 P:个人会员
    businessLicenseNumber: '',
    cellphone: '',
    content: '',
    companyInfo: {},
    personalInfo: {}
  },
  methods: {
    initPage: function () {
      this.memberType = $('#hidden_memberType').val();
      this.businessLicenseNumber = $('#hidden_businessLicenseNumber').val();
      this.cellphone = $('#hidden_cellphone').val();
      this.content = this.memberType === 'C' ? this.businessLicenseNumber : this.cellphone;
      this.searchApplyInfo();
    },
    searchApplyInfo: function () {
      axios.get('/apply/progress/search'
          .concat(`?memberType=${this.memberType}`)
          .concat(`&content=${this.content}`))
      .then(res => {
        if (res.data.err) {
          messager.error('系统发生异常，数据查询失败。');
          return false;
        }
        if (this.memberType === 'C') {
          this.companyInfo = res.data.result.length > 0 ? res.data.result[0] : {};
        } else {
          this.personalInfo = res.data.result.length > 0 ? res.data.result[0] : {};
        }
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