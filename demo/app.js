//app.js
var server = require('./utils/server.js');  // 引入检测登录、自动更新执行文件

App({
  onLaunch: function (e) {
    // console.log("app-onLaunch",e);

    server.autoUpdate();  // 调用自动更新版本功能

    // 检测登录是否有效
    wx.removeStorageSync('isUserDisabled');  // 删除用户已禁用状态缓存，避免即时切换后，缓存状态还存在
    wx.checkSession({
      success (res) {
        // session_key 未过期，并且在本生命周期一直有效
        // console.log("app-前端检测-未过期-走后台检测", res);
        server.checkLogin();
      },
      fail (res) {
        // session_key 已经失效，需要重新执行登录流程
        // console.log("app-前端检测-已经失效-走登录", res);
        // wx.clearStorage();  // 清除所有缓存信息 - 不能清除用户信息缓存，如果已登录注册且不是禁用状态，就拿不到用户信息了
        server.login();
      }
    });

    // // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

  },
  globalData: {
    userInfo: null,
    //打印机配置
    initFlag: true,
    openid: null,
    appid: null,
    webPath: "https://op.yundasys.com/opserver",
    decodeUserInfoUrl: "/interface/wxapp/decodeUserInfo4wxApp.do",
    interfaceUrl: "/interface.do",
    platform: 'ios',
    //打印机配置
    // 正式服务器地址
    // API_ROOT: '',

    // 测试服务器地址 -- 提交代码时记得切换
    // API_ROOT: '',

    // 开发环境
    // API_ROOT: '',
    API_ROOT: 'http://wanwu.com',
  },
  //打印机配置
  generateRequestObj:function(options, cb){
    options = options || {};
    if(!this.globalData.initFlag){
       var data = 'action='+options.action+
          '&version='+options.version+
          '&req_time='+new Date().getTime()+
          '&openid='+ this.globalData.openid+
          '&appid='+ this.globalData.appid+
          '&data='+JSON.stringify(options.data)
          typeof cb == "function" && cb({
            requestUrl:this.globalData.webPath + this.globalData.interfaceUrl + "?" + options.action + "&" + this.globalData.appid
            + "&" + data
          });
    } else{
      setTimeout(function(){
        getApp().generateRequestObj(options, cb);
      },100);
    }
},
  //打印机配置

  // 每个页面都需检测，是新用户时，跳转到用户注册页功能，解决用户未完善信息返回的情况
  toPerfectPage: function() {
    // 根据用户手机号，判断是 新用户 且 进入用户注册页返回，未完善信息时执行跳转
    if(!wx.getStorageSync('userInfo').mobile && wx.getStorageSync('newUserHasLogged') == "notSave") {
      // console.log("app-走toPerfectPage方法");

      // 新用户，跳转到完善信息页
      wx.showModal({
        title: '提示',
        content: '请先注册用户，完善个人信息后，才能使用该平台！',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../perfect/perfect',
            });
          }
        }
      });
    }
  },
  // 个别页面初始不调用ajax时，监听判断403状态跳转使用
  userDisabledJump: function() {
    // 是用户已禁用的状态，提示后跳转到首页
    if(wx.getStorageSync('isUserDisabled')) {
      // console.log("app-走userDisabledJump方法");

      wx.showModal({
        title: '提示',
        content: '您的账号已禁用，不能使用此平台！',
        confirmText: '知道了',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/index',
            });
          }
        }
      });
    }
  },
  // 输入内容是否为空或纯空格
  inputIsNull: function(str) {
    if (str == "") return true;
    var regu = "^[ ]+$"; // 匹配空格的字符
    var re = new RegExp(regu);   // 提取括号里的内容
    //为空或纯空格为 true    有值为false
    // console.log(re.test(str));
    return re.test(str);
  },
  // 成功提示图标弹框 - 7个汉字长度
  successHintToast: function(title) {
    wx.showToast({
      title: title,
      icon: 'success',
      mask: true,
      duration: 1500
    });
  },
  // 纯文本无图标提示弹框
  txtHintToast: function(title) {
    wx.showToast({
      title: title,
      icon: 'none',
      mask: true,
      duration: 1500
    });
  },
  // 0-1000000之内的最大随机数整数 - 解决服务器图片同名跟换后，真机缓存图片不更新问题
  getMath: function() {
    var num = Math.random() * 1000000;     //  求0~1000000以内的随机整数
    return Math.floor(num);
  },
})