/**
 * 1、使用哪一个事件
 *    使用onscroll，此事件移动端与PC端都有效。
 * 2、如何获取滚动条位置
 *    获取PC端滚动条位置：document.documentElement.scrollTop
 *    获取移动端滚动条位置：document.body.scrollTop
 * 3、如何获取视口宽度
 *    document.documentElement.clientWidth 移动端与PC端都有效。
 */
/**
 * 十六进制color颜色/RGBA/RGB，改变透明度
 * @param {*} thisColor #555 rgba(85,85,85,0.6) rgb(85,85,85)
 * @param {*} thisOpacity 0.7
 * @returns rgba(85,85,85,0.7)
 */
function getOpacityColor(thisColor, thisOpacity) {
    let theColor = thisColor.toLowerCase();
    //十六进制颜色值的正则表达式
    let r = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (theColor && r.test(theColor)) {
        if (theColor.length === 4) {
            let sColorNew = '#';
            for (let i = 1; i < 4; i += 1) {
                sColorNew += theColor.slice(i, i + 1).concat(theColor.slice(i, i + 1));
            }
            theColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let j = 1; j < 7; j += 2) {
            sColorChange.push(parseInt('0x' + theColor.slice(j, j + 2)));
        }
        return 'rgba(' + sColorChange.join(',') + ',' + thisOpacity + ')';
    }
    // 如果是rgba或者rgb
    if (theColor.startsWith('rgb')) {
        let numbers = theColor.match(/(\d(\.\d+)?)+/g);
        numbers = numbers.slice(0, 3).concat(thisOpacity);
        return 'rgba(' + numbers.join(',') + ')';
    }

    return theColor;
}
window.onload = function(){
    document.onscroll = function(){
        //获取滚动条位置
        let s1 = document.documentElement.scrollTop;
        let s2 = document.body.scrollTop;
        let scroll = s1===0?s2:s1;
        //获取顶部固定块
        let search = document.getElementById('fixedBox');
        let p = document.getElementById('s-p');
        let angle = document.getElementById('angle-left');
        //判断滚动条超过视口宽度的12%时，搜索块变固定定位
        search.style.backgroundColor= getOpacityColor("rgb(255,255,255)",scroll*0.015)
        if(scroll*0.015>=1){
            p.style.opacity = "1";
            angle.style.color = 'black'
        }
        else {
            p.style.opacity = "0";
            angle.style.color = 'white'
        }
    }
}