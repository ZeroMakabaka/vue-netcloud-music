import { getMusicLyric } from '@/axios/api/music';
export default {
    namespaced: true,
    state() {
        return {
            // 播放列表
            playlist: [{
                // 专辑信息
                al: {
                    "id": 195454,
                    "name": "All For You",
                    "picUrl": "https://p2.music.126.net/QRvYAvEcmLCX1Bup4yXWyg==/881808325521842.jpg",
                    "tns": [],
                    "pic": 881808325521842
                },
                name: "Before You Break My Heart",
                // 歌曲id
                id: 1940312,
            }],
            playingIndex: 0,  // 播放下标             
            isPlaying: false, // 播放标识
            isSongDetail: false,
            lyrics: {},    //歌词              
            currentTime: 0,   // 当前时间
            duration: 0,  //单曲时长
            historyList: JSON.parse(sessionStorage.getItem('historyList')) || [],  // 历史记录   
            isShowFooter: true,     
        }
    },

    mutations: {
        updateIsPlaying(state, value) {
            state.isPlaying = value;
        },
        updatePlaylist(state, value) {
            state.playlist = value
        },
        // 搜索点击之后的歌曲加入播放列表中
        addASong(state, value) {
            state.playlist.push(value)
        },
        //   updateSuggestVal(state,value){
        //     state.suggestVal = value
        //   },
        updatePlayingIndex(state, value) {
            state.playingIndex = value
        },
        updateIsSongDetail(state) {
            state.isSongDetail = !state.isSongDetail
        },
        updateLyrics(state, value) {
            state.lyrics = value
        },
        updateCurrentTime(state, value) {
            state.currentTime = value
        },
        updateDuration(state, value) {
            state.duration = value
        },
        updateHistoryList(state, value) {
            if (value.trim()) {
                state.historyList.unshift(value);
                // 去重
                state.historyList = [...new Set(state.historyList)];
                // 限制长度
                if (state.historyList.length > 10) {
                    state.historyList.pop();
                }

                sessionStorage.setItem("historyList", JSON.stringify(state.historyList));
            }
        },
        clearHistoryList(state) {
            state.historyList = [];
            sessionStorage.setItem("historyList", '[]');
        },

    },

    actions: {
        async getLyric(context,value){
            let res = await getMusicLyric(value)
            context.commit('updateLyrics',res.data.lrc)
        },
    }
}