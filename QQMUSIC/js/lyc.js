(function (window) {
    function Lyric(path) {
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor:  Lyric,
        init: function (path) {
            this.path = path;
    },
        times:[],
        lyrics:[],
        index: -1,
        loadLyric:function(callBack)    {
            var $this = this;
            $.ajax({
                url:$this.path,
                dateType:"text",
                success:function (data) {
                    $this.parseLyric(data);
                    callBack();
                },
                error:function (e) {
                }
            });
        },
        parseLyric:function (data) {
            var $this = this;
            //清空歌词
            $this.tiems = [];
            $this.lyrics = [];
            //歌曲时间
            var array = data.split("\n");
           // [00:00.01]正则表达式
            var  timeReg = /\[(\d*:\d*\.\d*)\]/;
            //遍历取出每一行歌词
            $.each(array,function (index, ele) {
                //歌词
                var lry = ele.split("]")[1];
                //排除空字符串
                if(lry.length ==  1) return true;
                $this.lyrics.push(lry);
                var res = timeReg.exec(ele);
                if(res == null) return true;
                //00:00.00
                var timeStr = res[1];
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(min + sec).toFixed(2));
                $this.times.push(time);
            });
            console.log($this.times);
            console.log($this.lyrics);
        },
        currentIndex: function (currentTime) {
            if(currentTime >= this.times[0]){
                this.index ++;
                this.times.shift();//删除数组最前面的一个元素
            }
            return this.index;
        }
    };
    Lyric.prototype.init.prototype =  Lyric.prototype;
    window.Lyric =  Lyric;
})(window);