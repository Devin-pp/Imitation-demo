$(function () {
    var $audio = $("audio");
    var player = new Player($audio);
    var progress;
    var voiceprogress;
    var lyric;

    //0.初始化滚动条
    $(".content_list").mCustomScrollbar();
    //1.加载歌曲
    getPlayList();
    function getPlayList() {
        $.ajax({
            url:"./source/musiclist.json",
            dateType:"json",
            success:function (data) {
                player.musicList = data;
                //遍历获取到的数据
                $.each(data,function (index, ele) {
                    var $item = crateMusicItem(index, ele);
                    var $musicList = $(".ulRow");
                    $musicList.append($item);
                });
                initMusicInfo(data[0]);
                initMusicLyric(data[0]);
            },
            error:function (e) {
                alert('歌曲不存在！')
            }
        });
    }
     //2.初始化歌曲信息
    function  initMusicInfo(music){

        var $musicImg = $(".song_info_pic");
        var $songName = $ (".song_name a");
        var $songSinger = $ (".song_singer a");
        var $songAlbum = $ (".song_album a");
        var $proSingName = $ (".proSingName");
        var $barTime = $ (".bar_time");
        var $bg = $(".bg");

        $musicImg.attr("src", music.cover);
        $songName.text(music.name);
        $songSinger.text(music.singer);
        $songAlbum.text(music.album);
        $proSingName.text(music.name + " - " + music.singer );
        $barTime.text("00:00 / " + music.time );
        $bg.css("background","url('"+ music.cover +"')");
    }
    //3.初始化歌词
    function  initMusicLyric (music){
        lyric = new Lyric(music.link_lrc);
        var $lryicContainer = $(".ly");
        //清空上一首歌曲的歌词
        $lryicContainer.html("");
        lyric.loadLyric(function () {
            //创建歌词列表
            $.each(lyric.lyrics,function (index, ele) {
                var $item = $("<li>"+ele+"</li>");
                $lryicContainer.append($item);
            })

        });
    }
    //3.初始化进度条
    progressALL();
    function progressALL(){
        var $progressBar = $(".bar");
        var $progressLine = $(".bar_line");
        var $progressDot = $(".bar_dot");
        progress = Progress($progressBar,$progressLine,$progressDot);
        progress.progressClick(function (value) {
            player.musicSeekTo(value);
        });
        progress.progressMove(function (value) {
            player.musicSeekTo(value);
        });

        var $voiceBar = $(".voice_bar");
        var $voiceLine = $(".voice_line");
        var $voiceDot = $(".voice_dot");
        voiceprogress = Progress($voiceBar,$voiceLine,$voiceDot);
        voiceprogress.progressClick(function (value) {
            player.musicVoice(value);
        });
        voiceprogress.progressMove(function (value) {
            player.musicVoice(value);
        });
    }
    //4.初始化事件监听
   initEven();
   function initEven() {
       //4.1复选框监听
       $(".ulRow").delegate(".check>span","click",function () {
           $(this).toggleClass("select");
       });
       //4.2li触碰监听
       $(".ulRow").delegate(".music","mouseenter",function () {
           $(this).find("div div").addClass("muse");
           $(this).find(".time a").stop().fadeIn(100);
           $(this).find(".time span").stop().fadeOut(100);
       });
       $(".ulRow").delegate(".music","mouseleave",function () {
           $(this).find("div div").removeClass("muse");
           $(this).find(".time a").stop().fadeOut(100);
           $(this).find(".time span").stop().fadeIn(100);
       });

       //4.3播放监听
       var $musicPlay = $(".the_model");
       $(".ulRow").delegate(".play_model1","click",function () {
           //切换播放
           var $parents = $(this).parents(".music");
           $(this).toggleClass("play_model2");
           //复原其他图标
           $parents.siblings().find(".play_model1").removeClass("play_model2");
           //同步底部播放
           if($(this).attr("class").indexOf("play_model2") != -1){
               //底部同步播放
               $musicPlay.addClass("the_model2");
               //文字高亮
               $parents.find(".title").css({"opacity":"1"});
               $parents.siblings().find(".title").css({"opacity":"0.5"});
               //序号改变动画
               $parents.find(".number i").css({"display":"none"});
               $parents.siblings().find(".number span").css({"display":"none"});
               $parents.find(".number span").css({"display":"block"});
               $parents.siblings().find(".number i").css({"display":"block"});
           }else{
               //底部同步关闭播放
               $musicPlay.removeClass("the_model2");
               //文字不高亮
               $parents.find(".title").css({"opacity":"0.5"});
               //序号改变动画
               $parents.find(".number i").css({"display":"block"});
               $parents.find(".number span").css({"display":"none"});
           }
               //播放音乐
           player.playMusic($parents.get(0).index,$parents.get(0).music);
                //切换歌曲信息
           initMusicInfo($parents.get(0).music);
              //切换歌词信息
           initMusicLyric($parents.get(0).music);

       });
       //4.4底部上一首按钮监听
       $(".last").click(function () {
                    $(".music").eq(player.preIndex()).find(".play_model1").trigger("click");
                });
       //4.5底部播放按钮监听
       $musicPlay.click(function () {
                    //判断有没有播放过音乐
                    if(player.currentIndex == -1){
                        //没有播放
                        $(".music").eq(0).find(".play_model1").trigger("click");
                    }else{
                        //播放过
                        $(".music").eq(player.currentIndex).find(".play_model1").trigger("click");
                    }
                });
       //4.6底部下一首按钮监听
       $(".next").click(function () {
                    $(".music").eq(player.nextIndex()).find(".play_model1").trigger("click");
                });
       //4.7删除按钮监听
       $(".ulRow").delegate(".del","click",function () {
                    //被点击的音乐
                    var $item = $(this).parents(".music");
                    //判断当前删除的是否是正在播放的
                    if($item.get(0).index == player.currentIndex){
                        $(".next").trigger("click");
                    }
                    $item.remove();
                    player.changeMusic($item.get(0).index);
                    //重新排序
                    $(".music").each(function (index, ele) {
                        ele.index = index;
                        $(ele).find(".number").text(index + 1);
                    })
                });
       //4.8监听播放进度
       player.musicTime(function (currentTime,duration,timeStr) {
           //同步时间
           $(".bar_time").text(timeStr)
           //同步进度
           var value = currentTime / duration * 100;
           progress.setProgress(value);
           //实现歌词同步
           var index = lyric.currentIndex(currentTime);
           var $item = $(".ly li").eq(index);
           $item.addClass("cur");
           $item.siblings().removeClass("cur");
           if(index <= 1 )return;
           $(".ly").css({
               marginTop:((-index + 1) * 30),
           });
       });
       //4.9声音进度
        $(".voice_model1").click(function () {
            $(this).toggleClass("voice_model2");
            if($(this).attr("class").indexOf("voice_model2") != -1){
                //没有声音
                player.musicVoice(0);
            }else{
                //有声音
                player.musicVoice(1);
            }
        })
   }
    //5.定义创建音乐
    function crateMusicItem(index, music) {
        var $item = $("<li class=\"music\">\n" +
            "<div class=\"check\"><span></span></div>\n" +
            "<div class=\"number\">\n" +
            "<i>"+(index + 1)+"</i>\n" +
            "<span></span>\n" +
            "</div>\n" +
            "<div class=\"title\">"+music.name+"" +
            "<div class=\"play\">\n" +
            "<a href=\"javascript:;\" title=\"播放\" class=\"play_model1\"></a>\n" +
            "<a href=\"javascript:;\" title=\"添加\"></a>\n" +
            "<a href=\"javascript:;\" title=\"下载\"></a>\n" +
            "<a href=\"javascript:;\" title=\"分享\"></a>\n" +
            "</div>\n" +
            "</div>\n" +
            "<div class=\"name\">"+music.singer+"</div>\n" +
            "<div class=\"time\">\n" +
            "<span>"+music.time+"</span>\n" +
            "<a href=\"javascript:;\" title=\"删除\" class='del'></a>\n" +
            "</div>\n" +
            "</li>");

        $item.get(0).index = index;
        $item.get(0).music = music;
        return $item;
    }


































});
