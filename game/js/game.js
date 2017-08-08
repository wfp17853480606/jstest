window.onload = function() {
    //后去元素样式
    function getStyle(obj, arrt) {
        return obj.currentStyle ? obj.currentStyle : getComputedStyle(obj, null)[arrt];
    }
    //获取所有的元素
    var main = document.getElementById('main');
    var go = document.getElementById('go');
    var count = document.getElementById('count');
    //初始化颜色，定义一个数组
    var cols = ['#A020F0', '#E15650', '#FFD700', '#80A84E'];
    //动态创建DIV
    function createDiv(classname) {
        var oDiv = document.createElement("div"); //创建了一个div
        //设置随机值
        var index = Math.floor(Math.random() * 4);
        //设置classname
        oDiv.className = classname;
        //在odiv中创建四个小的div,当作小列,并一一加入
        for (var j = 0; j < 4; j++) {
            var iDiv = document.createElement("div");
            oDiv.appendChild(iDiv);
        }
        //将行添加到main中，并判断需要添加的位置
        if (main.children.length == 0) {
            main.appendChild(oDiv);
        } else {
            main.insertBefore(oDiv, main.children[0]);
        }
        //随机给行里一个添加颜色
        oDiv.children[index].style.backgroundColor = cols[index];
        //给有颜色的那个加上classname
        oDiv.children[index].className = "i";
    }
    //移动div
    function move(obj) {
        //关闭上一个定时器
        clearInterval(obj.timer);
        //初始化速度与分数
        var speed = 5;
        var num = 0;
        //定时器
        obj.timer = setInterval(function() {
            //速度=obj的top加上speed
            var step = parseInt(getStyle(obj, "top")) + speed;
            //移动盒子
            obj.style.top = step + "px";
            //判断并且创建新盒子
            if (parseInt(getStyle(obj,"top")) >= 0) {
                createDiv("row");
                obj.style.top = -150 + "px";//待定
            }
            //删除边界外的盒子
            if (obj.children.length == 6) {
                //在删除之前如果有盒子没有点击那么游戏结束
                for (var i = 0; i < 4; i++) {
                    if (obj.children[obj.children.length - 1].children[i].className == "i") {
                        //游戏结束
                        obj.style.top = '-150px'; //不知道为什么
                        count.innerHTML = "GAME OVER 你的最高得分是：" + num;
                        //关闭定时器
                        clearInterval(obj.timer);
                        //显示开始游戏的字样
                        go.children[0].innerHTML = "RENEW GAME";
                        go.style.display = "block"; //不知大盘为啥
                    }
                }
                obj.removeChild(obj.children[obj.children.length - 1]);
            }
            //点击与计分
            obj.onclick = function(event) {
                //点击的不是白盒子，兼容IE
                event = event || window.event;
                if ((event.target ? event.target : event.srcElement).className == "i") {
                    //点击后盒子变色
                    (event.target ? event.target : event.srcElement).style.backgroundColor = "#ddd";
                    //消除盒子印记
                    (event.target ? event.target : event.srcElement).className = "";
                    //计分
                    num++;
                    //显示得分
                    count.innerHTML = "当前得分" + num;
                } //点击的是白盒子,那么游戏就结束了
                else {
                    obj.style.top = 0 + "px"; //不明白
                    count.innerHTML = "GAME OVER 你的最高得分是：" + num;
                    clearInterval(obj.timer);
                    go.children[0].innerHTML = 'Renew game';
                    go.style.display = "block";

                }
                //盒子加速
            if (num % 20 == 0) {
                speed++;
            }
            }
            
        }, 20)//每0.02s调用一次
    }
    //开始游戏
    go.children[0].onclick = function() {
        //开始之前先判断一下main里面是否有盒子，有的话就去掉
        if (main.children.length) {
            main.innerHTML = "";
        }
        //清空计分
        count.innerHTML = "游戏开始";
        //隐藏开始盒子
        this.parentNode.style.display = 'none';
        //调用定时器
        move(main);
    }
}