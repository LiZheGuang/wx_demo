// 正式服务器地址
// const API_ROOT = '';

// 以下两个环境域名，提交代码时记得切换
// 测试服务器地址
// const API_ROOT = '';

// 开发环境
const API_ROOT = 'http://wanwu.com';


// // 检测登录是否有效
// // wx.removeStorageSync('isUserDisabled');  // 删除用户已禁用状态缓存，避免即时切换后，缓存状态还存在
// wx.checkSession({
//   success (res) {
//     // session_key 未过期，并且在本生命周期一直有效
//     console.log("init-前端检测-未过期-走后台检测", res);
//     checkLogin();
//   },
//   fail (res) {
//     // session_key 已经失效，需要重新执行登录流程
//     console.log("init-前端检测-已经失效-走登录", res);
//     // wx.clearStorage();  // 清除所有缓存信息 - 不能清除用户信息缓存，如果已登录注册且不是禁用状态，就拿不到用户信息了
//     login();
//   }
// });

// 把token值传给后台进行校验，看后台是否过期
function checkLogin() {
  // console.log("向后台传token，进行校验", wx.getStorageSync('token'));
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  wx.request({
    url: API_ROOT + '/api/user/checkToken',
    method: 'GET',
    header: {
      'content-type': 'application/json', // 默认值
      'user-token': wx.getStorageSync('token')
    },
    success(res){
      wx.hideLoading();
      // console.log("server-校验后台是否登录过期", res.data);
      if(res.data.code != 0){
        // 已过期/用户已禁用，走登录
        // console.log("校验后台-已过期/用户已禁用-走登录", res.data);

        // wx.clearStorage();  // 清除所有缓存信息 - 此处不能清除用户信息缓存，如果已登录注册且不是禁用状态，就拿不到用户信息了
        login();
        
      } else {
        // console.log("校验后台-未过期-是否为新用户", res.data);

        // 根据用户手机号，判断是否为新用户
        if(!wx.getStorageSync('userInfo').mobile) {
          // console.log("校验后台-未过期-是新用户");

          // 新用户，跳转到完善信息页
          wx.navigateTo({
            url: '../perfect/perfect',
          });
        }

      }
    }
  });
}

// 登录
function login() {
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  wx.login({
    success (res) {
      // console.log("login-res",res);
      if (res.code) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: API_ROOT + '/api/user/login', 
          method: 'GET',
          data: {
            code: res.code
          },
          success: function(res) {
            wx.hideLoading();
            if(res.data.code == 0) {
              let datas = res.data.data;
              // console.log("登录返回数据",datas);
              wx.setStorageSync('token', datas.token);  // 缓存返回token值
              wx.setStorageSync('userInfo', datas.user);  // 缓存返回用户信息数据
              
              // 根据用户手机号，判断是否为新用户
              if(!datas.user.mobile) {
                // console.log("走登录-是新用户");

                // 新用户，跳转到完善信息页
                wx.navigateTo({
                  url: '../perfect/perfect',
                });
              }

            } else if(res.data.code == 403) {
              // 403时，缓存后台返回的token值，便于进入子页面时请求接口使用
              // console.log("403-返回token=",res.data.data.token);
              wx.setStorageSync('token', res.data.data.token);  // 缓存返回token值
              wx.setStorageSync('isUserDisabled', true);  // 缓存用户已禁用状态，个别页面初始不调用接口时，监听判断403状态使用

              // 用户禁用状态 - 显示弹框提示
              wx.showModal({
                title: '提示',
                // content: res.data.msg,
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

            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                mask: true,
                duration: 1500
              });
            }
          },
          fail: function(res) {
            wx.hideLoading();
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              mask: true,
              duration: 1500
            });
          }
        });
      } else {
        wx.hideLoading();
        // console.log('登录失败！' + res.errMsg);
      }
    }
  });
}

// 自动更新小程序版本
function autoUpdate() {
  // console.log("执行自动更新",new Date());
  
  // 获取小程序更新机制兼容
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager();
    // 1. 检查小程序是否有新版本发布
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        // 检测到新版本，需要更新，给出提示
        wx.showModal({
          title: '更新提示',
          content: '检测到新版本，是否下载新版本并重启小程序？',
          success: function(res) {
            if (res.confirm) {
              // 2. 用户【确定】下载更新小程序，小程序下载及更新静默进行
              downLoadAndUpdate(updateManager)
            } else if (res.cancel) {
              // 用户点击【取消】按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
              wx.showModal({
                title: '温馨提示~',
                content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                showCancel:false,// 隐藏取消按钮
                confirmText:"确定更新",// 只保留确定更新按钮
                success: function(res) {
                  if (res.confirm) {
                    // 下载新版本，并重新应用
                    downLoadAndUpdate(updateManager);
                  }
                }
              });
            }
          }
        });
      }
    });
  } else {
    // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    });
  }
}

// 下载小程序新版本并重启应用
function downLoadAndUpdate(updateManager) {
  wx.showLoading();
  // 静默下载更新小程序新版本
  updateManager.onUpdateReady(function () {
    wx.hideLoading();
    // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    updateManager.applyUpdate();
  });

  // 新的版本下载失败
  updateManager.onUpdateFailed(function () {
    wx.hideLoading();
    wx.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
    });
  });
}


module.exports = {
  checkLogin: checkLogin,
  login: login,
  autoUpdate: autoUpdate
}