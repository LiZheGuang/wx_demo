Page({
  data: {
    setArry:[
      {
        phone:"18839510071",
        address:"河南省郑州市二七区xxx街道xxx小区",
        addressid:1,
      },
      {
        phone:"1777777777",
        address:"河南省郑州市二七区xxx街道xxx小区",
        addressid:2,
        mr:true,
      },
    ],
    addreid:"", //详情进入id
    currid:"",//地址选择id
  },
 //新增地址跳转
 addressClick:function(e){
   var that=this;
  if(that.data.addreid){
    wx.navigateTo({
      url: "../newaddress/newaddress?addreid=10",
    })
  }else{
    wx.navigateTo({
      url: "../newaddress/newaddress",
    })
  }

 },
 //删除
 deletecontentClick:function(e){
    var that=this;
    let detaid=e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
 },
 //点击设置选中地址
 addresssetClick:function(e){
  var that=this;
  if(that.data.addreid){
    let phone=e.currentTarget.dataset.phone;
    let address=e.currentTarget.dataset.address;
    let addressid=e.currentTarget.dataset.id;
    wx.setStorageSync('addressid', addressid);
    wx.setStorageSync('phone', phone);
    wx.setStorageSync('address', address);
    if(that.data.currid){
      wx.navigateBack({
        delta: 3,
       })
    }else{
      wx.navigateBack({
        delta: 1,
       })
    }
   
  }else{
    wx.navigateTo({
      url: "../newaddress/newaddress?editid=6",
    })
  }
},
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options.addreid);
    that.setData({
      addreid:options.addreid,
      currid:options.currid,
    })
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
