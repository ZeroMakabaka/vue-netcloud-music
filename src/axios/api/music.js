import service from "..";

// 获取歌单详情页
export function getMusicListDetail(id){
    return service({
        method: 'GET',
        url: `/playlist/detail?id=${id}`
    })
}

// 获取歌单所有歌曲
export function getMusicList(id){
    return service({
        method: 'GET',
        url: `/playlist/track/all?id=${id}&limit=20&offset=0`
    })
}

// 获取歌词
export function getMusicLyric(id){
    return service({
        method: 'GET',
        url: `/lyric?id=${id}`
    })
}

