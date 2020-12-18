Page({
  data: {
    isHasUserInfo: false, // 是否有用户信息
    urlimg:"../../images/default_avatar.png", //url图片
    nickName:"",// 名称
  },
  // 授权获取用户信息
  bindGetUserInfo: function (e) {
    let that = this;
    // 授权登录功能低版本兼容处理
    if(!wx.canIUse('button.open-type.getUserInfo')) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        confirmText: '知道了',
        showCancel: false,
        success (res) {
          if (res.confirm) {

          }
        }
      });
    } else {
      // 拒绝授权
      if(e.detail.errMsg == "getUserInfo:fail auth deny") {
        wx.showModal({
          title: '提示',
          content: '允许授权后，才能使用功能哟~',
          confirmText: '知道了',
          showCancel: false,
          success (res) {
          
            if (res.confirm) {
              
            }
          }
        });
      } else {
        // 允许授权，向后台传递返回的encryptedData、iv数据，获取用户信息
       that.setData({
        isHasUserInfo:true,
        urlimg:e.detail.userInfo.avatarUrl,
        nickName:e.detail.userInfo.nickName,
       })
       let avatarUrl=e.detail.userInfo.avatarUrl;
       let nickName=e.detail.userInfo.nickName;
       wx.setStorageSync('userimg',avatarUrl);  // 授权后，更新用户信息缓存数据
       wx.setStorageSync('username',nickName);
      }
    }
  },
  //点击租赁列表
  listClick:function(e){
    wx.navigateTo({
      url: "../lists/lists",
    })
  },
  //使用中
  syzClick:function(e){
    wx.navigateTo({
      url: "../lists/lists?tarid=1",
    })
  },
   //已完成
   ywcClick:function(e){
    wx.navigateTo({
      url: "../lists/lists?tarid=2",
    })
  },
  //设置点击操作
  setClick:function(e){
    wx.navigateTo({
      url: "../setdetails/setdetails",
    })
  },
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    let userimg = wx.getStorageSync('userimg');
    let username = wx.getStorageSync('username');
      // 查看是否授权
      wx.getSetting({
        success (res){
          if (res.authSetting['scope.userInfo']) {
            console.log("my-已授权-显示编辑按钮");
            that.setData({
              isHasUserInfo:true,
              urlimg:userimg,
              nickName:username,
             })
          } else {
            console.log("my-未授权-显示登录按钮");
          }
        }
      });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
