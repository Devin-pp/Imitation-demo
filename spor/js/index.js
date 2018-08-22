



        let btnLeft = $(".left");
        let btnRight = $(".right");
        let btnLeft1 = $(".footer-left");
        let btnRight1 = $(".footer-right");
        let bgs = $(".wallpaper").children();
        let bgsIndex = bgs.index(bgs);
        let iNum = $(".page>i");
        let line = $(".line1 > i");
        let login = $(".login-list>li");
        let close = $(".close");
        let menu = $(".menus>div");
        let navBar = $(".navBar");


//初始化数据
    let config = {
        apiKey: "AIzaSyAC2T26KqBavy_eM9XJqV7nHSq3D0fwF1g",
        authDomain: "spor-82445.firebaseapp.com",
        databaseURL: "https://spor-82445.firebaseio.com",
        projectId: "spor-82445",
        storageBucket: "spor-82445.appspot.com",
        messagingSenderId: "190894611502"
    };
    firebase.initializeApp(config);
//创建collection
    let  messageRef = firebase.database().ref("spor");
//添加submit事件
    $("#submit").click(function (e) {
        e.preventDefault();
        let name =  $("#name").val();
        let phone =   $("#phone").val();
        let city =   $("#city").val();
        //存储数据
        saveMessage(name,phone,city);
        $(".success").css({
            "display":"block",
        });
        $(".gray").css({
            "display":"block"
        });


    });
    $(".success-close").click(function () {
        $(".gray") .css({
            "display":"none",
        })
        $("#name").val("");
        $("#phone").val("");
        $("#city").val("");

    });
    function  saveMessage(name,phone,city) {
        messageRef.push({
            name:name,
            phone:phone,
            city:city,
        });

    }
    function btnl(ele){
       ele.click(function () {
           //背景色变换
           bgsIndex --;
           if(bgsIndex < 0){
               bgsIndex = bgs.length-1;
           }
           btnl(ele);
           out();
           iNum.text(bgsIndex+1);
           move("moveLeft","moveRight");

       });
   }
 function btnr(ele) {
     ele.click(function () {
         //背景色变换
         bgsIndex ++;
         if(bgsIndex > bgs.length-1){
             bgsIndex = 0;
         }
         out();
         iNum.text(bgsIndex+1);
         move("moveRight","moveLeft");
     });
 }
    function  out() {
        bgs.eq(bgsIndex).show();
        setTimeout(function () {
            bgs.eq(bgsIndex).addClass("out dh");
        },100);

        bgs.eq(bgsIndex).siblings().hide();
        bgs.eq(bgsIndex).siblings().removeClass("out");
        setTimeout(function () {
            bgs.eq(bgsIndex).removeClass("dh");
        },1000);
    }
    //线条移动
    function move(string,string1){
        line.addClass(string);
        setTimeout(function () {
            line.removeClass(string).hide();
            line.addClass(string1);
        },600);
        setTimeout(function () {
            line.show();
        },800);
        setTimeout(function () {
            line.removeClass(string1);
        },1000)
    }
    btnl(btnLeft);
    btnl(btnLeft1);
    btnr(btnRight);
    btnr(btnRight1);

    //菜单
    login.click(function () {
        let loginIndex = login.index($(this));
        let menuIndex =  menu.eq(loginIndex);
        fileMove(menuIndex);
    });
    navBar.click(function () {
        fileMove(menu.eq(3));
    });
    close.click(function () {
        let closeIndex = close.index($(this));
        let menuIndex2 =  menu.eq(closeIndex );
        menuClose(menuIndex2);
    });
    function fileMove(ele){
            ele.css({"display":"block"}).stop().animate({top:0},100);
            setTimeout(function () {
            ele.addClass("menu1")
            },500)
    }
    function menuClose(ele){
        ele.addClass("menu2");
        setTimeout(function () {
            ele.removeClass("menu1");
        },300);
        setTimeout(function () {
            ele.stop().animate({top:100+"%"},100).removeClass("menu2");
        },500);
       setTimeout(function () {
           ele.css({"display":"none"})
       },1000)
    }


