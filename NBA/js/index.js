 $(function () {
     //置顶导航栏
     let navTop = $(".container").height();
     $(window).scroll(function () {
         let windowTop = pageYOffset;

         if (windowTop >= navTop-40) {
            $(".top-bar-4").css({
                "position":" fixed",
                "z-index":"999",
                "top":"0",
            });
        }else{
            $(".top-bar-4").css({
                "position":"absolute",
                "top":"122px"
            })
        }

     });
     Carousel();
     //底部轮播图
    function Carousel() {
        let pre = $(".scroll-pre");
        let next = $(".scroll-next");
        let ulIndex = 0;
        let lis = $(".scroll-bar1").children();
        let lisW = $(".scroll-bar1").children().width();
        let ulW = $(".scroll-bar1").width();
        let li = $(".scroll-bar1>li").prev(".liClone").clone(true);
        $(".scroll-bar1").append(li);


        pre.click(function () {
            ulIndex --;
            console.log(ulIndex);
            if(ulIndex < 0){
                $('.scroll-bar1').css({
                    left:   -210,
                });
                ulIndex = lis.length -1;
            }
            $(".scroll-bar1").stop().animate({left:ulIndex * -210},50);
        });

        next.click(function () {
            ulIndex ++;
            console.log(ulIndex);
            if(ulIndex === lis.length){
                $('.scroll-bar1').css({
                   left: 0,
                });
                ulIndex = 1;
            }
            $(".scroll-bar1").stop().animate({left: -ulIndex * 210},50);
        });
    }

    //sub-muse导航
     sub();
     function sub() {
         $(".select-team>li").mouseenter(function () {
             $(this).children().eq(1).stop().slideDown("fast");
         });
         $(".select-team>li").mouseleave(function () {
             $(this).children().eq(1).stop().slideUp("fast");
         })
     }


});
