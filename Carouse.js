function Carousel () {
    var $slider = $('<div class="slider" id="slider"></div>'),
        $span = $('<span id="left" ><</span><span id="right">></span>'),
        $ul = $('<ul class="nav" id="navs"></ul>'),
        $img ,
        $li;
    var datas = {
        boxName:"#box",
        imgNum:5,
        imgUrl:["img/b1.png","img/b2.png","img/b3.png","img/b4.png","img/b5.png"],
        speed:2000
    };

    this.show = function(Data){
        $.extend(datas,Data);
        var imgData = '',liData = '';
        for(let i = 0;i<datas.imgNum+2;i++){
            if(i == 0){
                imgData += '<div class="slide"><img src="'+datas.imgUrl[datas.imgNum-1]+'" alt=""></div>';
            }else if(i == datas.imgNum+1){
                imgData += '<div class="slide"><img src="'+datas.imgUrl[0]+'" alt=""></div>';
            }else {
                imgData += '<div class="slide"><img src="'+datas.imgUrl[i-1]+'" alt=""></div>';
                liData +='<li id="'+i+'">'+i+'</li>';
            }
        }
        $img = $(imgData);
        $li = $(liData);
        var $box = $(datas.boxName);
        $slider.append($img);
        $ul.append($li);
        $box.append($slider);
        $box.append($span);
        $box.append($ul);
    
        var $left = $('#left'),
            $right = $('#right'),
            $liList = $('li'),
            timer = null,
            idNum = 0,
            speed = datas.speed,
            speeds = 1;      
        $liList[idNum].className = "active";
        function toLeft(){
            if(idNum === 0){
                idNum = datas.imgNum-1;
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = "0px";
                setTimeout(function(){
                    $slider[0].style.transition ="left 0s";
                    $slider[0].style.left = (idNum+1) * -1200+"px";
                },speed/2);
            }
            else{
                idNum--; 
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = (idNum+1) * -1200+"px";
            }
            showDot (); 
        }
        function toRight(){
            if(idNum === datas.imgNum-1){
                idNum = 0;
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = (datas.imgNum+1) * -1200+"px";
                setTimeout(function(){
                    $slider[0].style.transition ="left 0s";
                    $slider[0].style.left = (idNum+1) * -1200+"px";
                },speed/2);
            }
            else{
                idNum++;
                $slider[0].style.transition ="left "+speeds+"s";
                $slider[0].style.left = (idNum+1) * -1200+"px";
            }
            showDot ();
        }
        //左右滑动 防抖
        function debounce(fun){
            let detimer;
            return function(){
                clearTimeout(detimer);
                detimer = setTimeout(()=>{
                    fun.call(this);
                },1)
            }
        }
        // 自动播放
        (function run() {
            timer = setInterval(function () {
                toRight();
            },3500);
        })();
        $left.click(debounce(toLeft));
        $right.click(debounce(toRight));
        function showDot () {
            for(var i = 0; i < $liList.length; i++){
                $liList[i].className = "";
            }
            $liList[idNum].className = "active";
        }   
        function dotClick(){
            let num = this.id;
            clearInterval(timer);
            idNum = num - 1;
            $slider[0].style.left=num * -1200+"px";
            showDot ();
        }
        $liList.click(debounce(dotClick));
        // 鼠标移入移出
        $box.onmouseenter = function () {
            clearInterval(timer);
            $span[0].style.opacity = 0.5;
            $span[1].style.opacity = 0.5;
        }
        $box.onmouseleave = function () {
            run();
            $span[0].style.opacity = 0;
            $span[1].style.opacity = 0;
        }
    }
}