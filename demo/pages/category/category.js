Page({
  data: {
    cateItems: [
      {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            price:100,
            name: '洁面皂',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 2,
            name: '卸妆',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 3,
            name: '洁面乳',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 4,
            name: '面部祛角质',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          }
        ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            price:100,
            name: '气垫bb',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 2,
            price:100,
            name: '修容/高光',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 3,
            price:100,
            name: '遮瑕',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 4,
            price:100,
            name: '腮红',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 5,
            name: '粉饼',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 6,
            name: '粉底',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 7,
            name: '蜜粉/散粉',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 8,
            name: '隔离霜',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          }
        ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
        [
          {
            child_id: 1,
            price:100,
            name: '淡香水EDT',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 2,
            name: '浓香水EDP',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 3,
            name: '香体走珠',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          },
          {
            child_id: 4,
            name: '古龙香水男士的最爱',
            image: "http://www.jinyisoubu.com/images/46/92/ba/34afa91f26220192f3293b51017adb71a5c1f1b3.JPG_t.JPG"
          }
        ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 1,
    curIndex: 0
  },
  onLoad: function (options) {
    let that = this;
  },
  //点击分类跳转
  navcategoryClick:function(e){
    let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../spdetails/spdetails?categoryid=" + id,
      })
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
})  