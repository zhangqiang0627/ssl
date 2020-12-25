let app = new Vue({
  el: "#app",
  data: {
    account: '',
    password: ''
  },
  methods: {
    login: function () {
      axios.get('/cms/login/search'
          .concat(`?account=${this.account}`)
          .concat(`&password=${this.password}`))
          .then(res => {
            if (res.data.err) {
              messager.error('系统发生异常，数据查询失败。');
              return false;
            }
            if (res.data.result.length === 0) {
              messager.info('账户或密码不正确！');
              return false;
            }
            let adminInfo = res.data.result[0];
            common.setCookie('ssl_admin', JSON.stringify(adminInfo));
            location.href = '/cms/apply/list';
          })
          .catch(err => {
            messager.error('无法连接网络，请检查网络设置。');
          })
    },
    onLogin: function () {
      if (dataVerify.isEmpty(this.account) || dataVerify.isEmpty(this.password)) {
        return false;
      }
      this.login();
    }
  }
});