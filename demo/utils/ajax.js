// 全局request封装
/**
* config: {
*  url: '',
*  method: '',
*  data: '',
*  customErrorHint: false   // 公共/自定义报错提示布尔值
* }
*/

/**
 * 请求方式可传，不传为GET
 * postData：参数，json类型
 * successFn：成功的回调函数
 * errorFn：失败的回调函数
 */

// const app = getApp();  // 获取全局应用实例
const API_ROOT = getApp().globalData.API_ROOT;  // 项目URL相同部分，减轻代码量，同时方便项目迁移
// console.log("ajax-API_ROOT=", API_ROOT);
// console.log("ajax-获取token=", wx.getStorageSync('token'));

function request(config, successFn, errorFn, ) {
  // 请求接口时，默认loading效果
  wx.showLoading({
    mask: true  // 显示透明蒙版，防止触摸穿透
  });
  wx.request({
    url: API_ROOT+ config.url,
    method: config.method?config.method:"GET",
    data: config.data?config.data:'',
    header: {
      'user-token': wx.getStorageSync('token'),
      'content-type': 'application/json' // 默认值
    },
    customErrorHint: config.customErrorHint?config.customErrorHint:false, // 走公共报错提示/当前功能请求自定义报错布尔值 - 默认公共报错
    success: function(res) {
      wx.hideLoading();   // 隐藏loading
      if(res.statusCode == 200) {
        // console.log("ajax封装-请求成功-200状态");
        if(res.data.code != 0) {
            // code != 0，报错提示
            // console.log("ajax封装-code != 0，报错执行","errorFn类型", typeof errorFn);

            if(errorFn && typeof errorFn === 'function') {
              errorFn(res);
  
              // code == 403，用户禁用状态提示
              if(res.data.code == 403) {
                // 用户禁用弹框提示
                // console.log("ajax封装-code == 403，走用户禁用提示", res.data.code);

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
                // code == 1，除403状态的公共纯文本报错提示，如页面请求中赋值为true，则走自定义报错提示
                if(!config.customErrorHint) {
                  // 报错提示
                  // console.log("ajax封装-code == 1，走公共报错提示");

                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    mask: true,
                    duration: 2000
                  });
                }
              }
              
            }

        } else {
          // code == 0，成功提示
          // console.log("ajax封装-code == 0，成功执行","successFn类型", typeof successFn);

          if(successFn && typeof successFn === 'function') {
            successFn(res);
            // console.log("ajax封装-code == 0，走成功提示");
            
            // 成功提示 - 不用提示，哪个接口需要的话当前接口中提示
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'success',
            //   mask: true,
            //   duration: 2000
            // });
          }
        }
      } else if(res.statusCode == 404) {
        console.log("ajax封装-请求失败-404状态");

          // // 提示 - 不用提示
          // wx.showToast({
          //   title: '请求失败，请求未找到',
          //   icon: 'none',
          //   mask: true,
          //   duration: 2000
          // });
      } else {
        console.log("ajax封装-请求失败-500等其他状态");

        // // 提示 - 不用提示
        // wx.showToast({
        //   title: '请求失败，服务器内部错误',
        //   icon: 'none',
        //   mask: true,
        //   duration: 2000
        // });
      }
    }
  });
}

module.exports = {
  request: request
}

