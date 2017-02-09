window.onload = function () {

    var c = document.getElementById('carousel');
    var cul = c.getElementsByTagName('ul');
    var cli = c.getElementsByTagName('li');

    //最后一张添加第一张的辅助图 第一张添加最后一张的辅助图
    var firstPic = cli[0];
    var lastPic = cli[cli.length - 1];
    var fPic = firstPic.cloneNode(true);
    var lPic = lastPic.cloneNode(true);
    cul[0].appendChild(fPic);
    cul[0].appendChild(lPic);
    cul[0].insertBefore(lPic,cli[0]);
    //初始化按钮
    var leftButton = document.createElement('div');
    leftButton.className = 'leftButton icon-left iconfont';
    leftButton.id = 'leftButton';
    c.appendChild(leftButton);
    var rightButton = document.createElement('div');
    rightButton.className = 'rightButton icon-right iconfont';
    rightButton.id = 'rightButton';
    c.appendChild(rightButton);
    //设置初始化的长度
    cul[0].style.left = -100 + '%';
    //计算图片的总长 每部分图片占据平均的宽度
    //picNum 图片总数
    //round时的ul宽度
    var picNum = cli.length;
    console.log(picNum * 100 +'%');
    cul[0].style.width = (picNum * 100) +'%';
    // console.log(cul[0].style.width);
    //direction默认为左右round 参数为flow时为上下翻动
    var direction = cul[0].getAttribute('direction');

    for(var i=0;i<cli.length;i++){
        cli[i].style.width = (100 / picNum).toFixed(2) + '%';
        if(direction == 'round' || direction == ''){
            cli[i].className = 'round';
        }
    }

    //carousel functions

    var timer = null;
    var currentSettle = -100;
    var carousel = {
        //init speed?
        //每个位移的初始总值
        //direction决定是左右还是上下的位移
        animation:function (target,direction) {
            clearInterval(timer);
            timer = setInterval(function () {
                if(parseInt(cul[0].style[direction]) == -100){
                    currentSettle = -100;
                }
                if(parseInt(cul[0].style[direction]) == -((picNum-2) * 100)){
                    currentSettle = -((picNum-2) * 100);
                }
                // var speed = -100;
                var speed = 0;
                if(target>0){
                    speed = 10;
                }else if(target<0){
                    speed = -10;
                }
                //console.log(speed);
                var newShift = parseInt(cul[0].style[direction]) + speed;
                cul[0].style[direction] = newShift +'%';

                //当到达目的位置时
                if(parseInt(cul[0].style[direction]) == currentSettle+target){
                    clearInterval(timer);
                    currentSettle = parseInt(cul[0].style[direction]);
                }
            },30);
        },
        slideToLeft:function(){
            //跳转到最后一张时跳至辅助图转回第一张
            if(parseInt(cul[0].style.left) == 0){
                cul[0].style.left = -((picNum-2) * 100) + '%';
            }
            carousel.animation(100,'left');
        },
        slideToRight:function () {
            //
            if(parseInt(cul[0].style.left) == -((picNum-1) * 100) ){
                cul[0].style.left = -100 + '%';
            }
            carousel.animation(-100,'left');

        },
        slideToTop:function () {
            if(parseInt(cul[0].style.top) == 0){
                cul[0].style.top = -((picNum-2)*100) + '%';
            }
            carousel.animation(100,'top');
        },
        slideToBottom:function () {
            if(parseInt(cul[0].style.top) == -((picNum-1)*100)){
                cul[0].style.top = -100 +'%';
                carousel.animation(-100,'top');
            }
        },
        autoPlay:function(){
            //默认向右滑动播放
            if(direction == 'round' || direction == ''){
                timer = setInterval(function () {
                    carousel.slideToRight(-100,'left');
                },30);
            }else if(direction == 'flow'){
                timer = setInterval(function () {
                    carousel.slideToBottom(-100,'top');
                },30);
            }
        },
        stopPlay:function(){
            clearInterval(timer);
        }

    };
    //
    c.onmouseover(carousel.stopPlay());
    c.onmouseout(carousel.autoPlay());
    carousel.autoPlay();



    //初始化
    //判断左右还是上下滚动

    // if(direction == 'round' || direction == ''){
    //
    // }else if(direction == 'flow'){
    //
    // }
    //通过按键去调用相对应的方法
    var leftBtn = document.getElementById('leftButton');
    leftBtn.onclick =  function () {
        if(direction == 'round' || direction == ''){
            carousel.slideToLeft();
        }else if(direction == 'flow'){
            carousel.slideToTop();
        }
    };
    var rightBtn = document.getElementById('rightButton');
    rightBtn.onclick = function () {
        if(direction == 'round' || direction == ''){
            carousel.slideToRight();
        }else if(direction == 'flow'){
            carousel.slideToBottom();
        }
    };

    //设置自动播放
    if(cul[0].autoplay == 'auto'){
        carousel.autoPlay();
    }
};