
let globalData = getApp().globalData;
var md5 = require('md5.js');
var categories = new Array();
var categoryURL = 'https://api.xinwen.cn/news/category';
var nowNewsUrl = 'https://api.xinwen.cn/news/all';
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
      url: categoryURL,
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
        categories = res.data.data.categories;
        categories[0].isSelect = true;
        that.fetchContent(categories[0].alias);
        that.setData({
          categories:categories,
        })
      }
    })
  },

  fetchContent: function(category){
    let that = this;
    var timestamp = new Date().getTime();
    var accesKey = globalData.accessKey;
    var secretKey = globalData.secretKey;
    var signature = md5.md5(secretKey + timestamp + accesKey);
    wx.request({
      url: nowNewsUrl,
      data: {
        access_key: accesKey,
        timestamp: timestamp,
        signature: signature,
        category:category,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data.news);    
        that.setData({
          news: res.data.data.news,
        })
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
  onCategoryItemClick: function (event) {
    console.log(event);
    var name = event.currentTarget.dataset.item.name;
    var curIndex = 0;
    for (var i = 0; i < this.data.categories.length; i++) {
      if (name == this.data.categories[i].name) {
        this.data.categories[i].isSelect = true;
        curIndex = i;
        this.fetchContent(categories[i].alias);
      } else {
        this.data.categories[i].isSelect = false;
      }
    }

    this.setData({
      content: this.data.categories[curIndex].name,
      categories: this.data.categories,
    });
  },

})