var dailyForecast;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    console.log(option.city)
    wx.setNavigationBarTitle({
      title: option.city,
    })

    let that = this;
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast', //三天天气api
      data: {
        key: '',
        location: option.city
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        var forecast = JSON.parse(JSON.stringify(res.data));
        dailyForecast = forecast.HeWeather6[0].daily_forecast;
        console.log(dailyForecast);
        that.setData({
          array:dailyForecast
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})