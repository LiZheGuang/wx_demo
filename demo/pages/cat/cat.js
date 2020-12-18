var numbers = 1;
var bool = true;
Page({
  data: {
    addressval:"", //租赁地址
    phoneval:"", //租赁电话
    addid:"",//地址id
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    // list: [],               // 购物车列表
    // hasList: false,          // 列表是否有数据
    // 默认展示数据
    hasList: true,
    // 商品列表数据
    list: [{
      id: 1,
      title: '园艺大师抗皱精华露园艺大师抗皱精华露园艺大师抗皱精华露',
      image: 'http://www.jinyisoubu.com/images/c9/98/6c/e16d8bf14403cde853b57bd8fdbc5cebdbd7eae4.JPG_t.JPG',
      pro_name: "30ml",
      num: 1,
      data:2,
      price: 10,
      selected: false
    },
    {
      id: 2,
      title: '伊芙琳玫瑰护手霜',
      image: 'http://www.jinyisoubu.com/images/5a/52/d5/edd340cf9c30e9a534653df711bf2777814b5730.JPG_t.JPG',
      pro_name: "25g",
      num: 1,
      data:2,
      price: 20,
      selected: false
    },
    {
      id: 2,
      title: '燕麦山羊乳舒缓护手霜',
      image: 'http://www.jinyisoubu.com/images/2d/3d/35/2eb330f9cbdc2a403100c27d1fe248eddf1cbeff.jpg_t.jpg',
      pro_name: "75ml",
      num: 1,
      data:2,
      price: 30,
      selected: false
    }
    ],
    // 金额
    totalPrice: 0, // 总价，初始为0
    // 全选状态
    selectAllStatus: false, // 全选状态，默认全选
    settlement:"",//总数
  },

  onShow() {
    var that=this;
    let addid=wx.getStorageSync('addressid');
    let phoneval=wx.getStorageSync('phone');
    let addressval=wx.getStorageSync('address');
    that.setData({
      addid:addid,
      phoneval:phoneval,
      addressval:addressval,
    });
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })

    // 价格方法
    this.count_price();
  },
  //选择地址
  addreClick:function(e){
    wx.navigateTo({
      url: "../setdetails/setdetails?addreid=10",
    })
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    // 默认全选
    that.data.selectAllStatus = false;
    // 循环数组数据，判断----选中/未选中[selected]
    list[index].selected = !list[index].selected;
    // 如果数组数据全部为selected[true],全选
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },
  // 编辑
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "block",
        edit_name: "取消",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "none",
        edit_name: "编辑",
        show_edit: "block"
      })
      bool = true;
    }

  },
  // 删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;
    // 获取商品列表数据
    let list = this.data.list;
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          // 页面渲染数据
          that.setData({
            list: list
          });
          // 如果数据为空
          if (!list.length) {
            that.setData({
              hasList: false
            });
          } else {
            // 调用金额渲染数据
            that.count_price();
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },
/**
   * 购物车全选事件
   */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list
    });
    // 计算金额方法
    this.count_price();
  },

  /**
   * 绑定加数量事件
   */
  btn_add(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 点击递增
    num = num + 1;
    list[index].num = num;
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list
    });
    // 计算金额方法
    this.count_price();
  },
  btn_adddata(e) {
    // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let data = list[index].data;
    // 点击递增
    data = data + 1;
    list[index].data = data;
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list
    });
    // 计算金额方法
    this.count_price();
  },
  /**
   * 绑定减数量事件
   */
  btn_minus(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let num = list[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    list[index].num = num;
    // 渲染页面
    this.setData({
      list: list
    });
    // 调用计算金额方法
    this.count_price();
  },
  btn_minusdata(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    // 获取商品数量
    let data = list[index].data;
    // 判断num小于等于1  return; 点击无效
    if (data <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    data = data - 1;
    list[index].data = data;
    // 渲染页面
    this.setData({
      list: list
    });
    // 调用计算金额方法
    this.count_price();
  },
  // 提交订单
  btn_submit_order: function () {
    var that = this;
    console.log(that.data.totalPrice);
  },
  /**
   * 计算总价
   */
  count_price() {
    // 获取商品列表数据
    let list = this.data.list;
    // 声明一个变量接收数组列表price
    let total = 0;
    // 循环列表得到每个数据
    let settlement=0;
    for (let i = 0; i < list.length; i++) {
      // 判断选中计算价格
      if (list[i].selected) {
        // 所有价格加起来 count_money
        total += list[i].num * list[i].price*list[i].data;
        settlement+=list[i].selected;
      }
    }
    // 最后赋值到data中渲染到页面
    this.setData({
      list: list,
      totalPrice: total.toFixed(2),
      settlement:settlement,
    });
  },
})