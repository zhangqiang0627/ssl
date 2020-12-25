let common = {};
common.appendScript = function(url) {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  document.body.parentNode.appendChild(script);
};
common.setCookie = function(name, value) {
  let days = 30;
  let exp = new Date();
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
};
common.getCookie = function(name) {
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  let arr = document.cookie.match(reg);
  if (arr === null) {
    return null;
  }
  return unescape(arr[2]);
};