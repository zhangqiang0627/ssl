let app = new Vue({
  el: "#app",
  data: {
    memberType: 'A',// A:全部 C:单位会员 P:个人会员
    memberTypeText: '全部',
    placeholder: '',
    searchContent: '',
    dataList: [],
    pageNumber: 1,
    isShowAlert: false,
    isShowLoadMore: true
  },
  methods: {
    resetData: function () {
      this.placeholder = '';
      this.searchContent = '';
      this.dataList = [];
      this.pageNumber = 1;
      this.isShowAlert = false;
      this.isShowLoadMore = true;
    },
    resetDataList: function () {
      this.dataList = [];
      this.pageNumber = 1;
      this.isShowAlert = false;
      this.isShowLoadMore = true;
    },
    checkIsLogin: function () {
      let cookieInfo = common.getCookie('ssl_admin');
      return !dataVerify.isEmpty(cookieInfo);

    },
    initPage: function () {
      if (!this.checkIsLogin()) {
        location.href = '/cms/login';
        return false;
      }
      this.searchList();
    },
    searchList: function () {
      axios.get('/cms/apply/list/search'
          .concat(`?pageNumber=${this.pageNumber}`)
          .concat(`&memberType=${this.memberType}`)
          .concat(`&content=${this.searchContent}`))
          .then(res => {
            if (res.data.err) {
              messager.error('系统发生异常，数据查询失败。');
              return false;
            }
            if (res.data.result.length === 0) {
              this.isShowLoadMore = false;
            }
            res.data.result.forEach((data) => {
              this.dataList.push(data);
            });
          })
          .catch(err => {
            messager.error('无法连接网络，请检查网络设置。');
          })
    },
    onLoadMore: function () {
      this.pageNumber++;
      this.searchList();
    },
    onShowDetail: function (memberID, memberType) {
      location.href = `/cms/apply/info?memberType=${memberType}&memberID=${memberID}`;
    },
    onMemberTypeChange: function (code, text) {
      if (code === this.memberType) {
        return false;
      }
      this.memberType = code;
      this.memberTypeText = text;
      this.searchContent = '';
      this.resetData();
      this.searchList();
    },
    onSearch: function () {
      // if (dataVerify.isEmpty(this.searchContent)) {
      //   return false;
      // }
      this.resetDataList();
      this.searchList();
    }
  },
  mounted() {
    this.initPage();
  },
});