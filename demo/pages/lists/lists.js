Page({
  data: {
    tabArr: {
      curHdIndex: 'selected' + 0,
    },
    count: '',
    page_no: 1, //当前页
    node_child: 1, //tab状态
    modefenlei: [{
        name: '待使用',
        target: 1,
      },
      {
        name: '使用中',
        target: 2
      },
      {
        name: '已完成',
        target: 3
      },

    ],
    loopcontArry: [{
        url: "http://app.jinyisoubu.com/images/c9/01/11/a0de03f3b41141f6f3016fcb985a76cb8a6025e0.png",
        text: "卡丁车",
        price: "100",
        numprice:"500",
        time: "2020-09-09-2020-10-20",
        spid: "10",
        
      },
      {
        url: "http://app.jinyisoubu.com/images/c9/01/11/a0de03f3b41141f6f3016fcb985a76cb8a6025e0.png",
        text: "卡丁车",
        price: "120",
        numprice:"800",
        time: "2020-09-09-2020-10-20",
        spid: "60",
      },
      {
        url: "http://app.jinyisoubu.com/images/c9/01/11/a0de03f3b41141f6f3016fcb985a76cb8a6025e0.png",
        text: "摄像机",
        price: "770",
        numprice:"999",
        time: "2020-09-09-2020-10-20",
        spid: "80",
      }
    ],
    tarid:"", //接收状态值
  },
  //点击tab切换
  stocktapClick: function (e) {
    console.log(e);
    let that = this;
    let dataId = e.currentTarget.id;
    let index = e.target.dataset.index;
    let node_childs = e.currentTarget.dataset.id;
    console.log(node_childs)
    let obj = {};
    obj.curHdIndex = dataId;
    that.setData({
      tabArr: obj,
      node_child: node_childs,
    });
    that.node_child = node_childs;
    let pages = getCurrentPages()
    let perpage = pages[pages.length - 1]
    perpage.onLoad();
  },
  onLoad: function (option) {
    //node_child 状态代表tab
    var that = this;
      if(option.tarid==1){
        that.setData({
          tabArr:{curHdIndex: "selected1"}
        });
      }
      if(option.tarid==2){
        that.setData({
          tabArr:{curHdIndex: "selected2"}
        });
      }
 },
})