
let globalData = getApp().globalData;
var md5 = require('md5.js');
var categories = new Array();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  fetchCategories: function(){
    let that = this;
    var timestamp = new Date().getTime();
    var accesKey = globalData.accessKey;
    var secretKey = globalData.secretKey;
    console.log(accesKey);
    var signature = md5.md5(secretKey + timestamp + accesKey);
    wx.request({
      url: 'https://api.xinwen.cn/news/category',
      data: {
        access_key: accesKey,
        timestamp: timestamp,
        signature:signature,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data.categories);
        for (var item in res.data.data.categories){
          var category;
          console.log(item.name);
          categories.push(category);
        }
        console.log(categories);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchCategories();
  },

  /**
    * item点击事件
    */
  onIpItemClick: function (event) {
    console.log(event);
    var id = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips.length; i++) {
      if (id == this.data.ips[i].id) {
        this.data.ips[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips[i].isSelect = false;
      }
    }

    this.setData({
      content: this.data.ips[curIndex].title,
      ips: this.data.ips,
    });
  },

})