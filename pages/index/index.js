//index.js
//获取应用实例
const app = getApp()
var mapdata = {
  latitude :"",
  longitude : "",
  altitude : "",
  scale : 28

}
var motto = ""
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    mapdata,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        mapdata.latitude =  res.latitude, // 经度
        mapdata.longitude = res.longitude // 纬度
        mapdata.altitude = res.altitude //高度
        this.setData({
           mapdata
        })
      }
    })
    //打开地图选择位置
    // wx.chooseLocation({
    //   success: (res) => {
    //     this.setData({
    //       mapname: res.name, //位置名称
    //       mapaddress: res.address,
    //       latitude:res.latitude,
    //       longitude:res.longitude
    //     })
    //   }
    // })
    //使用微信内置地图查看位置。
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        mapdata.latitude = res.latitude
        mapdata.longitude = res.longitude
        wx.openLocation({
          mapdata
        })
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUserMap: function (e) {
    //获取登录用户的经度、维度
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        mapdata.altitude = res.latitude, // 经度
        mapdata.longitude = res.longitude // 纬度
        mapdata.altitude = res.altitude //高度
        this.setData({
          mapdata,
          motto: "位置更新成功~"
        })


        // this.setData({
        //   motto: "位置更新成功~",
        //   latitude : res.latitude, // 经度
        //   longitude : res.longitude, // 纬度
        //   altitude:  res.altitude //高度
        // })
      }
    })
  }
})
