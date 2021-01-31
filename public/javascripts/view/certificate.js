let app = new Vue({
  el: "#app",
  data: {
    memberType: '',// C:单位会员 P:个人会员
    memberID: 0,
    noData: false,
    memberChooseZh: '',
    memberChooseEn: '',
    memberNameZh: '个人姓名',
    memberNameEn: 'MEMBER NAME',
    certificateNumber: 'SSL-DW-9999',
    validDate: '2021-01-01 ~ 2021-12-31'
  },
  methods: {
    initPage: function () {
      this.memberType = $('#hidden_memberType').val();
      this.memberID = $('#hidden_memberID').val();
      this.search();
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
    search: function () {
      let that = this;
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
              that.memberChooseZh = '会长单位';
              that.memberChooseEn = 'CORPORATION OF PRESIDENT';
              that.memberNameZh = res.data.result[0].company_name;
              that.certificateNumber = 'SSL-DW-' + res.data.result[0].certificate_number.toString().padStart(4, '0');
            } else {
              that.memberChooseZh = '常务理事';
              that.memberChooseEn = 'EXECUTIVE MEMBER OF THE COUNCIL';
              that.memberNameZh = res.data.result[0].full_name;
              that.certificateNumber = 'SSL-GR-' + res.data.result[0].certificate_number.toString().padStart(4, '0');
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