// optimization:
//speed优化！！！！！
//index问题验证

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

    //direction默认为左右round 参数为flow时为上下翻动
    var direction = cul[0].getAttribute('direction');
    //picNum 图片总数
    var picNum = cli.length;

    if(direction == 'round' || direction == ''){
        //设置初始化的长度
        cul[0].style.left = -100 + '%';
        //计算图片的总长 每部分图片占据平均的宽度
        //round时的ul宽度
        cul[0].style.width = (picNum * 100) +'%';
        //每个li的宽度
        for(var i=0;i<cli.length;i++){
            cli[i].style.width = (100 / picNum).toFixed(2) + '%';
            cli[i].className = 'round';
        }

    }else if(direction == 'flow'){
        //设置初始化的长度
        cul[0].style.top = -100 + '%';
        //计算图片的总长 每部分图片占据平均的宽度
        //round时的ul宽度
        cul[0].style.width =  100 +'%';
    }

    //carousel functions
    var timer = null;//animation : timer
    var t =null;//autoplay: t

    var durationTime = 0;

    var duration = parseInt(cul[0].getAttribute('duration'));
    if( duration == ''){
        durationTime = 2;
    }else{
        durationTime = parseInt(cul[0].getAttribute('duration'));
    }

    var currentSettle = 0;
    if(direction == 'round'){
        currentSettle = parseInt(cul[0].style['left']);
    }else{
        currentSettle = parseInt(cul[0].style['top']);
    }



    //设置成动态获取的,在autoplay后由于currentSettle不一致无限+100,不平衡
    var carousel = {
        //init speed?
        //每个位移的初始总值
        //direction决定是左右还是上下的位移
        animation:function (target,direction) {
            clearInterval(timer);
            if(parseInt(cul[0].style[direction]) == -100){
                currentSettle = -100;
            }
            if(parseInt(cul[0].style[direction]) == -((picNum-2) * 100)){
                currentSettle = -((picNum-2) * 100);
            }
            timer = setInterval(function () {
                //每次运行前首先获取当前的left值
                //speed正负是否有区别 参数已为负
                var speed = 0;
                if(target>0){
                    // speed = Math.ceil(currentSettle+target - parseInt(cul[0].style[direction]))/8;
                    speed = 10;
                }else if(target<0){
                    // speed = Math.ceil(currentSettle+target - parseInt(cul[0].style[direction]))/8;
                    speed = -10;
                }
                //console.log(speed);
                console.log('current：'+ currentSettle);
                console.log('target：'+target);
                console.log('direction：'+parseInt(cul[0].style[direction]));
                //当到达目的位置时
                if(parseInt(cul[0].style[direction]) == currentSettle+target){
                    clearInterval(timer);
                    currentSettle = parseInt(cul[0].style[direction]);
                }else{
                    var newShift = parseInt(cul[0].style[direction]) + speed;
                    cul[0].style[direction] = newShift +'%';
                }
            },50);
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
            }
            carousel.animation(-100,'top');
        },
        autoPlay:function(){
            //默认向右滑动播放
            if(direction == 'round' || direction == ''){
                t = setInterval(function () {
                    carousel.slideToRight(-100,'left');
                },durationTime*1000);
            }else if(direction == 'flow'){
                t = setInterval(function () {
                    carousel.slideToBottom(-100,'top');
                },durationTime*1000);
            }
        },
        stopPlay:function(){
            clearInterval(t);
        },
        indexSlide:function (el) {
            //根据当前的总图片数来加载相应的导航点数
            //点击对应的导航点数跳转至相应的图片位置

            //检测出当前的位置 index
            //与即将要跳转的位置作比较 index*100 current
            //找出最近的跳转的方向 执行动画向左/右 < > left/right
            //到达目的位置 静止一定时间后开始自动轮播 autoPlay
            var currentIndex = el.index;
            var targetIndex = li.index;

            if(currentIndex < targetIndex){
                slideToLeft();
            }else{
                slideToRight();
            }

        }
    };
    //
    //鼠标移出移入时触发
    cul[0].onmouseout = function () {
        carousel.autoPlay();
    }
    cul[0].onmouseover = function () {
        carousel.stopPlay();
    };
    //初始化自动播放
    carousel.autoPlay();
    //通过按键去调用相对应的方法
    var leftBtn = document.getElementById('leftButton');
    leftBtn.onclick = function () {
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

    //初始化导航栏
    var nav = cul[0].getAttribute('nav');

    if(nav == true){
        //创建navigator
        var navigator = document.createElement('div');
        for(var i = 0;i < cli.length - 2;i++){
            navigator.appendChild('li');
            var nli = document.getElementsByTagName('li');
            nli[nli.index].click(function () {
                carousel.indexSlide();
            });

        }
    }else{

    }




};