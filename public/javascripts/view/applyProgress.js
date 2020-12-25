let applyProgress = new Vue({
  el: "#app",
  data: {
    memberType: 'C',// C:单位会员 P:个人会员
    placeholder: '',
    searchContent: '',
    companyInfo: {},
    personalInfo: {},
    isShowDetail: false,
    isShowAlert: false
  },
  methods: {
    initPage: function () {
      this.setPageType();
    },
    setPageType: function () {
      if (this.memberType === 'C') {
        this.placeholder = '请输入营业执照编号';
      } else {
        this.placeholder = '请输入手机号码';
      }
    },
    searchInfo: function () {
      axios.get('/apply/progress/search'
          .concat(`?memberType=${this.memberType}`)
          .concat(`&content=${this.searchContent}`))
      .then(res => {
        if (res.data.err) {
          messager.error('系统发生异常，数据查询失败。');
          return false;
        }
        this.isShowAlert = res.data.result.length === 0;
        this.isShowDetail = res.data.result.length > 0;
        if (this.memberType === 'C') {
          this.companyInfo = res.data.result.length > 0 ? res.data.result[0] : {};
        } else {
          this.personalInfo = res.data.result.length > 0 ? res.data.result[0] : {};
        }
      })
      .catch(err => {
        messager.error('无法连接网络，请检查网络设置。');
      })
    },
    onMemberType: function (code) {
      if (code === this.memberType) {
        return false;
      }
      this.searchContent = '';
      this.isShowDetail = false;
    },
    onSearch: function () {
      if (dataVerify.isEmpty(this.searchContent)) {
        return false;
      }
      this.searchInfo();
    }
  },
  mounted() {
    this.initPage();
  },
});