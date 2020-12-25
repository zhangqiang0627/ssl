let app = new Vue({
  el: "#app",
  data: {
    memberType: '',// C:单位会员 P:个人会员
    memberID: 0,
    title: '',
    noData: false,
    companyInfo: {},
    personalInfo: {},
    dataStatus: 'P'
  },
  methods: {
    initPage: function () {
      this.memberType = $('#hidden_memberType').val();
      this.memberID = $('#hidden_memberID').val();
      this.setTitle();
      this.searchInfo();
    },
    setTitle: function () {
      if (this.memberType === 'C') {
        this.title = '陕西物流学会单位会员申请登记表';
      } else {
        this.title = '陕西物流学会个人会员申请登记表';
      }
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
        } else {
          this.personalInfo = res.data.result[0];
          this.personalInfo.resumeList = JSON.parse(this.personalInfo.resumes);
          this.dataStatus = this.personalInfo.data_status;
        }
      })
      .catch(err => {
        messager.error('无法连接网络，请检查网络设置。');
      })
    },
    onApprove: function (status) {
      axios.put('/cms/apply/info/approve', {
        memberType: this.memberType,
        memberID: this.memberID,
        status: status
      })
      .then(function(res) {
        if (res.data.err) {
          messager.error('系统发生异常，提交失败。')
          return false;
        }
        location.reload();
      })
      .catch(function(error) {
        messager.error('无法连接网络，请检查网络设置。');
      });
    }
  },
  mounted() {
    this.initPage();
  },
});