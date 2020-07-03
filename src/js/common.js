// 范围随机数（包括头和尾）；
function random(max,min){
    if(min>max){
        var change=min;
        min=max;
        max=change;
    };
    return parseInt(Math.random()*(max-min+1))+min;
};

// 补零函数
function zeroInfront(n){
    if(n.length<2 || n<10){
        return "0"+n;
    }
    return n;
}


// 十六进制颜色随机；
function colorRandom(){
    var r=zeroInfront(random(0,255).toString(16));
    var g=zeroInfront(random(0,255).toString(16));
    var b=zeroInfront(random(0,255).toString(16));

    return "#"+r+g+b;
}


// 随机rgb的颜色值：
function rgbRandom(){
    var r=random(0,255);
    var g=random(0,255);
    var b=random(0,255);

    return "rgb(" + r + "," + g + "," + b + ")";
}



// 日期格式化；
function presentTime(){
    var t=new Date();
    var year=t.getFullYear();
    var month=t.getMonth()+1;
    var date=t.getDate();
    var day=t.getDay();
    var hours=t.getHours();
    var minute=t.getMinutes();
    var seconds=t.getSeconds();
    var millS=t.getMilliseconds();
    switch(day){
        case 0: day="日";break;
        case 1: day="一";break;
        case 2: day="二";break;
        case 3: day="三";break;
        case 4: day="四";break;
        case 5: day="五";break;
        case 6: day="六";break;
    }
    
    return {
        year:year,
        month:zeroInfront(month),
        date:zeroInfront(date),
        day:day,
        hours:zeroInfront(hours),
        minutes:zeroInfront(minutes),
        seconds:zeroInfront(seconds),
        millS:millS,
    }
}

// 时间差
function timeMargin(date1,date2){
    // 将用户输入的字符串创造为一个日期；
    var d1= new Date(date1);
    // 判断date2是否传参，如果没有传参则使用当前时间；
    var d2;
    if(date2){
        d2= new Date(date2);
    }else{
        d2= new Date();
    }

    // 计算两个日期之间的毫秒差；
    var t = Math.abs(d1.getTime() - d2.getTime());

    // 将毫秒差转换为具体的天、时、分、秒；打包至一个对象返回；
    var mS=t%1000;
    var s=parseInt(t/1000)%60;
    var min=parseInt(t/1000/60)%60;
    var h=parseInt(t/1000/60/60)%24;
    var day=parseInt(t/1000/60/60/24);
    
    return {
        mS:mS,
        s:s,
        min:min,
        h:h,
        day:day,
    }
}



// 取数组的最大值
function getMax(arr){
    var narr=arr.slice(0);
    return max=narr.sort(function(a,b){
        return a-b;
    })[narr.length-1];
}

// 取数组的最大值
function getMin(arr){
    var narr=arr.slice(0);
    return min=narr.sort(function(a,b){
        return a-b;
    })[0];
}


// 数组去重；
function valueNoRepeat(arr){
    var nArr = arr.filter(function(value,index,self){
        // 没有标明起始位置，查找索引默认从第一位开始，当遍历到与之前重复的value时，得到的索引与当前的索引会不相等，从而达到过滤效果；
           return self.indexOf(value) == index;
    });
    return nArr;
}


// 获取非行内样式的兼容模式；
function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];  // IE8以下
    }else{
        return getComputedStyle(ele, false)[attr];  // IE8以上
    }
}

// 改变元素属性的封装
function attrChange(ele,data,elsefn){
    clearInterval(ele.t);
    ele.t = setInterval(() => {
        // 声明一个变量记录当前data对象中的数据是否完全遍历；
        var onoff=true;

        // 移动的速度；
        for(var i in data){
            // 获取元素与i对应的属性值当前的值
            // if(i === "opacity"){
            //     var iPre = getStyle(ele,i)*100;
            // }else{
            //     var iPre = parseInt(getStyle(ele,i));
            // }
            // 三目写法：
            var iPre = i === "opacity"? getStyle(ele,i)*100 : parseInt(getStyle(ele,i));
            // console.log(iPre)

            var speed = (data[i] - iPre)/8;
            speed = speed>0? Math.ceil(speed) : Math.floor(speed);
            

            // if判断条件里面的obox.offsetLeft不能使用 obox.style.left；因为这里有单位；不是数值以及数值型字符串；无法与final相等；
            if(i === "opacity"){      
                ele.style[i] = (iPre + speed)/100;
                ele.style.filter = "alpha(opacity="+(iPre+speed)+")";
            }else{
                ele.style[i] = iPre + speed + "px";
            }

            // 只要有一个属性没有达到目标值，就将onoff的值记录为false，阻止计时器关闭；
            if(iPre != data[i]){
                onoff=false;
            }
        }
        // 当完全遍历后onoff的值变为true；关闭计时器；
        if(onoff==true){
            clearInterval(ele.t);
            // 当前传入的data遍历且属性值完全到达目标值之后，执行一下函数；
            elsefn && elsefn();
        }
    }, 30);
}

//  精简版动画；
function animate(ele,oTar,callback){
    //开启计时器先清除上一次的计时器；
    clearInterval(ele.tim)
    ele.tim = setInterval(function(){
        var timOn = true;
        for(var i in oTar){
            //1.计算当前的属性值；
            var current = i == "opacity"? parseInt(getStyle(ele,"opacity")*100):parseInt(getStyle(ele,i));
            //2 设置动画速度；
            var speed = oTar[i]>current? Math.ceil((oTar[i]-current)/10):Math.floor((oTar[i]-current)/10);
            //3 设置下一步动画的位置；
            var next = current + speed;
            //4 有选择的设置当前属性值，
            if(next==oTar[i]){
                ele.style[i] = i=="opacity" ? oTar[i]/100:oTar[i]+"px";
            }else{
                ele.style[i] = i=="opacity" ? next/100:next+"px";
                timOn = false;
            }    
        } 
        if(timOn == true){
            clearInterval(ele.tim);
            callback && callback();
        }
    },1000/60)
    
}

function aniMultiAttr(ele,oTar,callback,spe,time){
    spe = spe || 10;
    var interval = time*1000 || 1000/600;
    clearInterval(ele.tim)
    ele.tim = setInterval(function(){
        var timOn = true;
        for(var i in oTar){
            //1.计算当前的属性值；
            if(i == "opacity"){
                var current = parseInt(getStyle(ele,"opacity")*100);
            }else if(i == "zIndex"){
                ele.style.zIndex = oTar[i];
            }else{
                var current = parseInt(getStyle(ele,i));
            }
            //2 设置动画速度；
            var speed = oTar[i]>current? Math.ceil((oTar[i]-current)/10):Math.floor((oTar[i]-current)/10);
            //3 设置下一步动画的位置；
            var next = current + speed;
            //4 有选择的设置当前属性值，
            if(i!= "zIndex"){
                if(next==oTar[i]){
                    if(i=="opacity"){
                        ele.style.opacity =oTar[i]/100;
                        ele.style.filter = "alpha(opacity="+oTar[i]+")";
                    }else{
                        ele.style[i] = oTar[i]+"px";
                    }
                }else{
                    if(i=="opacity"){
                        ele.style.opacity =next/100;
                        ele.style.filter = "alpha(opacity="+next+")";
                    }else{
                        ele.style[i] = next+"px";
                    }
                    timOn = false;
                }
            }                
        }
        if(timOn == true){
            clearInterval(ele.tim);            
            callback && callback();
        }
    },interval)

}

// 阻止事件冒泡兼容处理
function stopBubble(e){
    if(e.stopPropagation){
        e.stopPropagation();   // 正常浏览器
    }else{
        e.cancelBubble = true;  // IE低版本
    }
}


// 阻止默认右键菜单；
function stopRightmenu(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}

//通过ID名获取元素；
function $id(id){
    return document.getElementById(id);
} 

//事件处理的兼容写法
function addEvent(element,type,func){
    if(element.addEventListener){   //判断是否存在dom2方法
        element.addEventListener(type,func,false);
    }else if(element.detachEvent){  //是否为IE8及以前
        element.attachEvent('on'+type,func);
    }else{
        element['on'+type]=func;  //其他情况
    }
}
function removeEvent(element,type,func){
    if(element.removeEventListener){
       element.removeEventListener(type,func,false);
    }else if(element.detachEvent){
        element.detachEvent('on'+type,func);
    }else{
        element['on'+type]=null;
    }
}

// 获取浏览器窗口可视高度的兼容
function windowHeight(){
    if(document.compatMode == "CSS1Compat"){
        return document.documentElement.clientHeight;
    }else{
        return document.body.clientHeight;
    }
}

// 获取滚轮滚过的距离的兼容
function getScroll(){
    return document.body.scrollTop + document.documentElement.scrollTop;
}
