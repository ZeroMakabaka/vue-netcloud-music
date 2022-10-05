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

// 搜索
export function getSearchResult(data){
    return service({
        method: 'GET',
        url:`/cloudsearch?keywords=${data}`
    })
}

// 获取搜索默认关键词
export function getDefaultSearch(){
    return service({
        method: 'GET',
        url:`/search/default`
    })
}

// 获取搜索建议
export function getSearchSuggest(data){
    return service({
        method: 'GET',
        url:`/search/suggest?keywords=${data}&type=mobile`
    })
}

// 获取搜索建议
export function getSearchHot(){
    return service({
        method: 'GET',
        url:`/search/hot/`
    })
}