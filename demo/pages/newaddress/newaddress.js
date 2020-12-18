Page({
  data: {
    phoneval:"", //联系电话
    addressval:"", //租赁地址
    addreid:"", //详情进入id
  },
  //监测电话和地址
  lxphone:function(e){
    var that=this;
    that.setData({
      phoneval:e.detail.value,
    });
  },
  lxaddress:function(e){
    var that=this;
    that.setData({
      addressval:e.detail.value,
    });
  },
  //确定提交地址
  determineClick: function (e) {
    var that=this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
     if(!that.data.phoneval){
      wx.showToast({
        title: "请输入联系电话",
        icon: 'none',
        duration: 1500
      });
   }else if(!myreg.test(that.data.phoneval)){
    wx.showToast({
      title: "请输入正确联系电话",
      icon: 'none',
      duration: 1500
    });
   }else if(!that.data.addressval){
      wx.showToast({
        title: "请输入租赁地址",
        icon: 'none',
        duration: 1500
      });
    }else{
      wx.showToast({
        title: "添加成功",
        icon: 'none',
        duration: 1500
      });
      if(that.data.addreid){
        wx.navigateTo({
          url: "../setdetails/setdetails?currid=10&addreid=10",
        })
      }else{
        wx.navigateTo({
          url: "../setdetails/setdetails",
        })
      }
    }
   },  
   //设为默认
   mrszClick: function (e) {
    var that=this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
     if(!that.data.phoneval){
      wx.showToast({
        title: "请输入联系电话",
        icon: 'none',
        duration: 1500
      });
   }else if(!myreg.test(that.data.phoneval)){
    wx.showToast({
      title: "请输入正确联系电话",
      icon: 'none',
      duration: 1500
    });
   }else if(!that.data.addressval){
      wx.showToast({
        title: "请输入租赁地址",
        icon: 'none',
        duration: 1500
      });
    }else{
      wx.showToast({
        title: "添加成功",
        icon: 'none',
        duration: 1500
      });
      if(that.data.addreid){
        wx.navigateTo({
          url: "../setdetails/setdetails?currid=10&addreid=10",
        })
      }else{
        wx.navigateTo({
          url: "../setdetails/setdetails",
        })
      }
    }
   },  
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    if(options.editid){
      wx.setNavigationBarTitle({
        title: '编辑地址'
      });
    }
    that.setData({
      addreid:options.addreid
    });
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
