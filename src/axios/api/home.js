import service from "..";
//手机登录
export function loginByPhone(data){
    return service({
        method: 'POST',
        url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
    })
}
// 登出
export function loginOut(){
    return service({
        method: 'GET',
        url: `logout`
    })    
}
// 发送验证码
export function sendCaptcha(data){
    return service({
        method: 'GET',
        url: `/captcha/sent?phone=${data}`
    })
}
// 验证验证码 
export function verifyCaptcha(data){
    return service({
        method: 'GET',
        url: `/captcha/verify?phone=${data.phone}&captcha=${data.captcha}`
    })
}
// 获取用户信息
export function getUserDetail(data){
    return service({
        method: 'GET',
        url: `/user/detail?uid=${data}`
    })
}
// 获取用户信息
export function getLoginStatus(){
    return service({
        method: 'GET',
        url: `/login/status`
    })
}
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