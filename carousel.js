window.onload = function () {

    var c = document.getElementById('carousel');
    var cul = c.getElementsByTagName('ul');
    var cli = c.getElementsByTagName('li');
    //
    //最后一张添加第一张的辅助图 第一张添加最后一张的辅助图
    var firstPic = cul[0].firstChild;
    var lastPic = cul[0].lastChild;
    var fPic = firstPic.cloneNode(true);
    var lPic = lastPic.cloneNode(true);
    cul[0].appendChild(fPic);
    cul[0].appendChild(lPic);
    cul[0].insertBefore(lPic,cul[0].firstChild);
    //初始化按钮
    var leftButton = document.createElement('div');
    leftButton.className = 'leftButton icon-left iconfont';
    leftButton.id = 'leftButton';
    c.appendChild(leftButton);
    var rightButton = document.createElement('div');
    rightButton.className = 'rightButton icon-right iconfont';
    rightButton.id = 'rightButton';
    c.appendChild(rightButton);
    var topButton = document.createElement('div');
    topButton.className = 'topButton';
    c.appendChild(topButton);
    var bottomButton = document.createElement('div');
    bottomButton.className = 'bottomButton';
    c.appendChild(bottomButton);
    //设置初始化的长度
    cul[0].style.left = -100 + '%';
    //计算图片的总长 每部分图片占据平均的宽度
    //picNum 图片总数
    var picNum = cli.length;
    console.log(picNum * 100 +'%');
    cul[0].style.width = (picNum * 100) +'%';
    // console.log(cul[0].style.width);

    for(var i=0;i<cli.length;i++){
        cli[i].style.width = (100 / picNum).toFixed(2) + '%';
    }


    //carousel functions

    var timer = null;
    var currentSettle = -100;
    var carousel = {
        //init speed?
        //每个位移的初始总值
        animation:function (target) {
            clearInterval(timer);
            timer = setInterval(function () {
                if(parseInt(cul[0].style.left) == -100){
                    currentSettle = -100;
                }
                if(parseInt(cul[0].style.left) == -((picNum-2) * 100)){
                    currentSettle = -((picNum-2) * 100);
                }
                // var speed = -100;
                // speed = speed<0?Math.ceil(parseInt(cul[0].style.left)/8):Math.floor(parseInt(cul[0].style.left)/8);
                var speed = 0;
                if(target>0){
                    speed = 10;
                }else if(target<0){
                    speed = -10;
                }
                console.log(speed);
                var newShift = parseInt(cul[0].style.left) + speed;
                cul[0].style.left = newShift +'%';

                //当到达目的位置时
                if(parseInt(cul[0].style.left) == currentSettle+target){
                    clearInterval(timer);
                    // if(parseInt(cul[0].style.left) == 100 || parseInt(cul[0].style.left) == -((picNum-2) * 100) ){
                    //     //parseInt(cul[0].style.left) == ((picNum-1) * 100)
                    //     currentSettle = 0;
                    // }else{
                    currentSettle = parseInt(cul[0].style.left);
                    // }

                }

            },30);
        },
        slideToLeft:function(){
            //跳转到最后一张时跳至辅助图转回第一张
            if(parseInt(cul[0].style.left) == 0){
                cul[0].style.left = -((picNum-2) * 100) + '%';
            }
            carousel.animation(100);
        },
        slideToRight:function () {
            //
            if(parseInt(cul[0].style.left) == -((picNum-1) * 100) ){
                cul[0].style.left = -100 + '%';
            }
            carousel.animation(-100);

        }
        // slideToTop:function () {
        //
        // },
        // slideToBottom:function () {
        //
        // }

    };


    //初始化

    //通过按键去调用相对应的方法
    var leftBtn = document.getElementById('leftButton');
    leftBtn.onclick =  function () {
        carousel.slideToLeft();
    };
    var rightBtn = document.getElementById('rightButton');
    rightBtn.onclick = function () {
        carousel.slideToRight();
    };
    // var topBtn = document.getElementById('topButton');
    // topBtn.onclick = carousel.slideToTop();
    // var bottomBtn = document.getElementById('bottomButton');
    // bottomBtn.onclick = carousel.slideToBottom();
};