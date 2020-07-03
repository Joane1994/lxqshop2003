// 建立cookie；
function setCookie(key,val,day){
    day = day*24*60*60*1000 ;
    var tim = new Date;
    tim.setTime(tim.getTime()-8*60*60*1000+day);
    document.cookie = key+"="+val+";expires="+tim;
}


// 删除cookie;
function removeCookie(key){
    setCookie(key,getCookie(key),-1);
}

function getCookie(key){
    var str = document.cookie;
    var arr = str.split("; ");
    for(var i=0; i<arr.length; i++){
        var newArr = arr[i].split("=");
        if(newArr[0]==key){
            return newArr[1];
        }
    }
}