Page({
  data: {
    imgUrls: [ "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"],
    unitprice:10,//单价
    leasedatas:"1",//租赁天数
    leasenums:"1", //租赁数量
    addressval:"", //租赁地址
    phoneval:"", //租赁电话
    addid:"",//地址id
    totalprice:10, //总价
  },
  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.imgUrls // 需要预览的图片http链接列表
    })
},
 //点击选择联系电话或者地址
 settextClick:function(e){
  wx.navigateTo({
    url: "../setdetails/setdetails?addreid=10",
  })
 },
 //监测天数
 datasbind:function(e){
   var that=this;
  if(e.detail.value<=0){
    wx.showToast({
      title: '天数最小为1',
      icon: 'none',
      duration: 2000
    })
    that.setData({
      leasedatas:1
    })
  }else{
    that.setData({
      leasedatas:e.detail.value
    })
  }
  let pricebox=(that.data.leasedatas)*(that.data.leasenums)*(that.data.unitprice);
  that.setData({
    totalprice:pricebox
  })
 },
 //监测数量
 numsbind:function(e){
  var that=this;
  if(e.detail.value<=0){
    wx.showToast({
      title: '数量最小为1',
      icon: 'none',
      duration: 2000
    })
    that.setData({
      leasenums:1
    })
  }else{
    that.setData({
      leasenums:e.detail.value
    })
  }
  let pricebox=(that.data.leasedatas)*(that.data.leasenums)*(that.data.unitprice);
  that.setData({
    totalprice:pricebox
  })
 },
 //加入购物车
 catClick:function(e){
  wx.switchTab({
    url: "../cat/cat",
  })
 },
 //立即下单
 orderClick:function(e){
   var that=this;
    if(!that.data.phoneval){
      wx.showToast({
              title: "请选择联系电话",
              icon: 'none',
              duration: 1500
            });
    }else{
     wx.showToast({
      title: "下单成功",
      icon: 'none',
      duration: 1500
    });
     // 成功后，返回上一页
     setTimeout(function() {
      wx.navigateBack({
        delta: 1
      });
    },1500);
    }
 }, 
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //从分类进入详情id
    console.log(options.categoryid);
    //接收商品id 根据商品详情 后期请求接口数据
    let shopid=options.spid;
    console.log(shopid);
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
    //给租赁地址手机号赋值
    let addid=wx.getStorageSync('addressid');
    let phoneval=wx.getStorageSync('phone');
    let addressval=wx.getStorageSync('address');
    that.setData({
      addid:addid,
      phoneval:phoneval,
      addressval:addressval
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
