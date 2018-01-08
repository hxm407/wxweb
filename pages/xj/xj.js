// pages/xj/xj.js
function add0(m) { return m < 10 ? '0' + m : m }
function formatTime(shijianchuo) {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(shijianchuo);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  // var h = time.getHours();
  // var mm = time.getMinutes();
  // var s = time.getSeconds();
  // return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
  return y + '-' + add0(m) + '-' + add0(d);
}

var startdate = formatTime(new Date);
var starttime= '12:00';
var enddate = formatTime(new Date);
var endtime= '12:00';
var sjc = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    startdate,
    starttime,
    enddate ,
    endtime,
    sjc:'',//时间差
  },
  bindButtonTap: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },


  //  点击时间组件确定事件  
  bindTimeChange: function (e) {
    console.log("开始日期选择")
    this.setData({
      starttime: e.detail.value
    })
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      startdate: e.detail.value
    })
  },
  // end 点击时间组件确定事件  
  bindTimeChange2: function (e) {
    console.log("开始日期选择")
    this.setData({
      endtime: e.detail.value
    })
  },
  // end 点击日期组件确定事件  
  bindDateChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      enddate: e.detail.value
    })
  },
  //时间差计算
  jisuanshijian:function(e){
    console.log(e.detail.value);
    endtime;
    enddate;
    // var date1 = '2015/05/01 00:00:00';  //开始时间  
    var date1 = this.data.startdate + ' ' + this.data.starttime;  //开始时间  
    var date2 = this.data.enddate + ' ' + this.data.endtime;    //结束时间  
    var date3 = new Date(date2).getTime() - new Date(date1).getTime();   //时间差的毫秒数        
    //------------------------------  
    //计算出相差天数  
    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数  

    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数  
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数  
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数  
    var minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数  
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数  
    var seconds = Math.round(leave3 / 1000)
    // var s = (" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒") 
    
    this.setData({
      sjc: " 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒"
    })
  },
  //重置
  chongzhi:function(){
    this.setData({
       startdate: '2018-01-01',
       starttime: '12:00',
       enddate: '2018-01-01',
       endtime: '12:00',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })
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
    return {
      title: '页面分享标题',
      // path: '/pages/path/to/target',
      path: '/pages/index',
      success(res) {
      console.log(res.shareTickets[0]) // 奇怪为什么 shareTickets 是个数组？这个数组永远只有一个值。
      }
    }
  }
})