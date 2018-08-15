var bmap = require('../../libs/bmap-wx.js');
var wxMarkerData = [];
let globalData = getApp().globalData
Page({
  data: {
    searchText: '',
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {}
  },
  makertap: function(e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  onLoad: function() { 
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: globalData.ak
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.search({
      "query": '美食',
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },

  showSearchInfo: function(data, i) {
    var that = this;
    console.log('showSearchInfo');
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },

  serchKeyWord: function(query){
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: globalData.ak
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }

    BMap.search({
      "query": query,
      fail: fail,
      success: success,
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    });
  },

  changeMarkerColor: function(data, id) {
    var that = this;
    var markersTemp = [];
    for (var i = 0; i < data.length; i++) {
      if (i === id) {
        data[i].iconPath = "../../img/marker_yellow.png";
      } else {
        data[i].iconPath = "../../img/marker_red.png";
      }
      markersTemp[i] = data[i];
    }
    that.setData({
      markers: markersTemp
    });
  },
  commitSearch(res) {
    let val = ((res.detail || {}).value || '').replace(/\s+/g, '')
    this.serchKeyWord(val)
    this.setData({
      searchText: '',
    })
  }
})