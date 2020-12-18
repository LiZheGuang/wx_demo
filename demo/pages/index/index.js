//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [ 
      {
        id:0,
        bannerimg:"http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
      },
      {
        id:1,
        bannerimg:"http://www.jinyisoubu.com/images/c9/98/6c/e16d8bf14403cde853b57bd8fdbc5cebdbd7eae4.JPG_t.JPG"
      },
      {
        id:3,
        bannerimg:"http://www.jinyisoubu.com/images/73/06/15/9451c50edc8c8f98879e34231b9e69a24fdebff2.JPG_t.JPG"
      },
    ],
    equipmentArry:[
      {
        url:"http://www.jinyisoubu.com/images/f9/e3/7f/6995e5f2fb009973a4b88aea09ff966dc00a1a4b.jpg_t.jpg",
        text:"标题",
        title:"由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        price:"60",
        date:"天",
        state:"使用中",
        equipmentid:"1",
      },
      {
        url:"http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG",
        text:"标题内容",
        title:"由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
        price:"70",
        date:"天",
        state:"闲置中",
        equipmentid:"2"
      },
    ],
  },
//点击列表跳转商品详情
equipmentClick:function(e){
  //情况缓存数据
  wx.removeStorageSync("phone");
  wx.removeStorageSync("address");
  //获取点中那个商品
  let shopid=e.currentTarget.dataset.equipmentval;
  wx.navigateTo({
    url: "../spdetails/spdetails?spid=" + shopid,
  })
},
/**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
  },
//点击轮播图片
previewImage:function(e){
  let id = e.currentTarget.dataset.id;
  console.log(id);
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
