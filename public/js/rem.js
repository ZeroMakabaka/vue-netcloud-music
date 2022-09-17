// rem适配
function remSize(){
    // 获取设备宽度
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth
    
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <=320) {
        deviceWidth = 320
    }

    // 调整rem: 750px--->   1rem = 100px
    document.documentElement.style.fontSize = (deviceWidth/7.5) + 'px'
    // 调整字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

remSize()

// 当窗口变化时，调用remSize进行适配
window.onresize = function () {
    remSize()
}