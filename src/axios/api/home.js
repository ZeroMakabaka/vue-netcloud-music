import service from "..";

// 获取轮播图数据
export function getSwiper(){
    return service({
        method: 'GET',
        url: '/banner?type=2'
    })
}

// 获取发现好歌单
export function getMusicList(){
    return service({
        method: 'GET',
        url: '/personalized?limit=10'
    })
}