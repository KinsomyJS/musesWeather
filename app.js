App({
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systeminfo = res
        this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
      },
    })
  },
  globalData: {
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
    isIPhoneX: false,
    ak: 'D3TgSK54SeEG35g12dZYw6dLVtLCmGG9',
  },
  setGeocoderUrl(address) {
    return `https://api.map.baidu.com/geocoder/v2/?address=${address}&output=json&ak=${this.globalData.ak}`
  },
})