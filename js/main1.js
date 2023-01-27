/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
var app = new Vue({
  el: "#app",
  data: {
    query: "",
    musicInfo: [],
    musicUrl: "",
    musicName: "",
    imgShow: false,
    imageSrc: "",
    musicDetail: {},
    alName: "",
    singer: "",
    review: {}
  },
  methods: {
    queryMusic: function (query) {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + query).then(
        function (response) {
          
          that.musicInfo = response.data.result.songs;
        }, function (err) {
          console.log(err);
        }
      )
    },
    getMusic: function (id) {
      var that = this;
      
      axios.get("https://autumnfish.cn/song/url?id=" + id).then(
        function (response) {
          that.musicUrl = response.data.data[0].url;
        }, function (err) {
          console.log(err);
        }
      )
    },
    getDetail: function(id){
      var that = this;
      
      axios.get("https://autumnfish.cn/song/detail?ids=" + id).then(
        function (response) {
          
          that.musicDetail = response.data.songs[0];
          that.imageSrc = that.musicDetail.al.picUrl;
          that.alName = that.musicDetail.al.name;
          that.singer = that.musicDetail.ar[0].name;
          that.musicName = that.musicDetail.name;
          that.imgShow = true;

        }, function (err) {
          console.log(err);
        }
      )
    },
    getReview: function(id){
      var that = this;
      console.log(id);
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + id).then(
        function (response) {
          console.log(response);
          console.log("执行了getReview");
          that.review = response.data.hotComments;
          // [0].content
        }, function (err) {
          console.log(err);
        }
      )
    }
  }
})